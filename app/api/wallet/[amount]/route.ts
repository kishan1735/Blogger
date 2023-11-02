import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Pay from "@/models/payModel";
import User from "@/models/userModel";
import { NextApiRequest } from "next";
import connectMongoDB from "@/lib/dbConnect";
import { redisClient } from "@/utils/redis";

export async function GET(req: Request, { params }: { params: any }) {
  let user: any;
  try {
    const session = await getServerSession(authOptions);
    let userCache = session?.user?.email;
    await connectMongoDB();
    const cachedUser = await redisClient.get("User :" + userCache);
    if (cachedUser !== "null" && cachedUser !== null) {
      user = await JSON.parse(cachedUser);
    } else {
      user = await User.findOne({ email: session?.user?.email });
      await redisClient.set("User :" + userCache, JSON.stringify(user));
      await redisClient.expire("User :" + userCache, 1200);
    }
    const pay = await Pay.create({
      amount: +params.amount,
      buyerId: user._id.toString(),
      time: Date.now(),
    });
    if (!user) {
      throw new Error("User not found");
    }
    user = await User.findByIdAndUpdate(user._id, {
      walletBalance: user.walletBalance + Number(params.amount),

      $push: {
        transactionHistory: {
          for: "wallet",
          amount: +params.amount,
          time: Date.now(),
        },
      },
    });
    user = await User.findById(user._id);
    await redisClient.set("User :" + userCache, JSON.stringify(user));
    await redisClient.expire("User :" + userCache, 1200);
    return NextResponse.redirect(`${process.env.URL}/wallet`);
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
