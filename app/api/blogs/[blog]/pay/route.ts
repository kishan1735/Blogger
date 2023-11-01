import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectMongoDB from "@/lib/dbConnect";
import Blog from "@/models/blogModel";
import Pay from "@/models/payModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function handlePay(req: Request, { params }: { params: any }) {
  try {
    const session = await getServerSession(authOptions);
    await connectMongoDB();
    let user = await User.findOne({ email: session?.user?.email });
    let blog = await Blog.findById(params.blog);
    if (!blog) {
      throw new Error("Blog Not Found");
    }
    const pay = await Pay.create({
      amount: -2,
      time: Date.now(),
      buyerId: user._id.toString(),
    });
    user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      {
        walletBalance: user.walletBalance - 2,
        $push: { purchased: blog._id.toString() },
      }
    );
    return NextResponse.json({ status: "success", user, pay });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { handlePay as GET };
