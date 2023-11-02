import connectMongoDB from "@/lib/dbConnect";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import Blog from "@/models/blogModel";

async function handleView(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    await connectMongoDB();
    let user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(user._id);
    const blog = await Blog.findOneAndUpdate(
      { publisher: user._id.toString() },
      {
        $push: {
          views: {
            id: user._id,
            time: Date.now(),
          },
        },
      }
    );
    console.log(blog);
    if (!blog) {
      throw new Error("Blog not found");
    }
    console.log(user);
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { handleView as GET };
