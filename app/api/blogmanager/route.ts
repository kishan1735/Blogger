import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectMongoDB from "@/lib/dbConnect";
import Blog from "@/models/blogModel";

export async function GET() {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const user: any = await User.findOne({ email: session?.user?.email });
    let blogs = [];
    for (var blog_id of user.blogs) {
      const blog = await Blog.findById(blog_id);
      blogs.push(blog);
    }
    if (user.blogs.length == 0) {
      throw new Error("you have created no Blogs");
    }
    return NextResponse.json({ status: "success", blogs: blogs });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
