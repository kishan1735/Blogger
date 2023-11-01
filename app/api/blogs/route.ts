import Blog from "@/models/blogModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectMongoDB from "@/lib/dbConnect";

export async function POST(req: Request): Promise<any> {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();
    let user: any = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found");
    }
    let blog: any = await Blog.create({
      name: data.name,
      publisher: user._id,
      time: new Date(Date.now()),
      plan: data.plan || "normal",
      content: data.content,
    });
    user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      { $push: { blogs: blog._id } }
    );
    return NextResponse.json({ status: "success", blog });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectMongoDB();
    let blogs: any;
    const data = await req.json();
    if (!data.search) blogs = await Blog.find();
    else {
      blogs = await Blog.find({ name: { $regex: data.search } });
    }
    if (blogs.length == 0) {
      throw new Error("Blogs Not Found");
    }
    return NextResponse.json({ status: "success", blogs });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
