import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectMongoDB from "@/lib/dbConnect";

async function GetHandler(req: Request, { params }: { params: any }) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    let blog = await Blog.findById(params.blog);
    if (!blog) {
      throw new Error("Blog Not Found");
    }
    const author = await User.findById(blog.publisher.toString());
    const user = await User.findOne({ email: session?.user?.email });
    blog = await Blog.findByIdAndUpdate(params.blog, {
      $push: {
        views: {
          id: user._id,
          time: Date.now(),
        },
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (blog.plan == "normal") {
      return NextResponse.json({
        status: "success",
        purchased: true,
        blog,
        author,
        user,
      });
    } else if (user._id.toString() == author._id.toString()) {
      return NextResponse.json({
        status: "success",
        purchased: true,
        blog,
        author,
        user,
      });
    } else if (user?.purchased.includes(params.blog)) {
      return NextResponse.json({
        status: "success",
        purchased: true,
        blog,
        author,
        user,
      });
    } else {
      return NextResponse.json({
        status: "success",
        purchased: false,
        blog,
        author,
        user,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { GetHandler as GET };
