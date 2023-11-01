import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    await connectMongoDB();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ status: "success", user });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
