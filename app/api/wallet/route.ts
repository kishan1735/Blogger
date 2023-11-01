import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Pay from "@/models/payModel";
import User from "@/models/userModel";
import { NextApiRequest } from "next";

async function createPayCheckout(req: any, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    let user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found");
    }
    const pay = await Pay.create({
      amount: 500,
      buyerId: user._id.toString(),
      time: Date.now(),
    });
    await User.findByIdAndUpdate(user._id, {
      walletBalance: user.walletBalance + 500,
      $push: {
        transactionHistory: {
          amount: 500,
          time: Date.now(),
        },
      },
    });
    return NextResponse.redirect("http://localhost:3000/wallet");
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { createPayCheckout as GET };