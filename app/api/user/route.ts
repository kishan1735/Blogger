import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redisClient } from "@/utils/redis";

export async function GET(req: Request) {
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

    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ status: "success", user });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
