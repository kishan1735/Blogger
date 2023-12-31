import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectMongoDB from "@/lib/dbConnect";
import { redisClient } from "@/utils/redis";

export async function GET(req: Request, { params }: { params: any }) {
  let blog;
  let user;
  let cachedBlog = params.blog;
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);

    let userCache = session?.user?.email;
    let blogCache = params.blog;

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
    const author = await User.findById(blog.publisher.toString());

    blog = await Blog.findByIdAndUpdate(params.blog, {
      $push: {
        views: {
          id: user._id,
          time: Date.now(),
        },
      },
    });
    blog = await Blog.findById(params.blog);
    await redisClient.set("Blog :" + blogCache, JSON.stringify(blog));
    await redisClient.expire("Blog :" + blogCache, 1200);
    if (blog.plan == "normal" && user._id.toString() == author._id.toString()) {
      return NextResponse.json({
        status: "success",
        purchased: true,
        owner: true,
        blog,
        author,
        user,
      });
    } else if (blog.plan == "normal") {
      return NextResponse.json({
        status: "success",
        purchased: true,
        owner: false,
        blog,
        author,
        user,
      });
    } else if (user._id.toString() == author._id.toString()) {
      return NextResponse.json({
        status: "success",
        purchased: true,
        owner: true,
        blog,
        author,
        user,
      });
    } else if (user?.purchased.includes(params.blog)) {
      return NextResponse.json({
        status: "success",
        purchased: true,
        owner: false,
        blog,
        author,
        user,
      });
    } else {
      return NextResponse.json({
        status: "success",
        purchased: false,
        owner: false,
        blog,
        author,
        user,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    let userCache = session?.user?.email;
    const blog = await Blog.findByIdAndDelete(params.blog);
    if (!blog) {
      throw new Error("Blog not found");
    }
    await redisClient.flushDb();
    let user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      { $pull: { blogs: params.blog } }
    );
    user = await User.findOne({ email: session?.user?.email });
    await redisClient.set("User :" + userCache, JSON.stringify(user));
    await redisClient.expire("User :" + userCache, 1200);
    return NextResponse.json({
      status: "success",
      message: "Successfully deleted",
    });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
