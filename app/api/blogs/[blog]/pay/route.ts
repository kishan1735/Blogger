import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectMongoDB from "@/lib/dbConnect";
import Blog from "@/models/blogModel";
import Pay from "@/models/payModel";
import User from "@/models/userModel";
import { redisClient } from "@/utils/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function handlePay(req: Request, { params }: { params: any }) {
  let user;
  let blog;
  try {
    let blogCache = params.blog;
    const session = await getServerSession(authOptions);
    await connectMongoDB();
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
    const cachedBlog = await redisClient.get("Blog :" + blogCache);
    if (cachedBlog !== null && cachedBlog !== "null") {
      blog = JSON.parse(cachedBlog);
    } else {
      blog = await Blog.findById(params.blog);
      await redisClient.set("Blog :" + blogCache, JSON.stringify(blog));
      await redisClient.expire("Blog :" + blogCache, 1200);
    }
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
    user = await User.findById(user._id);
    await redisClient.set("User :" + userCache, JSON.stringify(user));
    await redisClient.expire("User :" + userCache, 1200);
    return NextResponse.json({ status: "success", user, pay });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { handlePay as GET };
