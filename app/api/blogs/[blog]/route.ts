import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";

export async function GetHandler(req: Request, { params }: { params: any }) {
  const blog = await Blog.findById(params.blog);

  const user = await User.findById(blog.publisher);
  return NextResponse.json({
    status: "success",
    blog,
    user,
  });
}

export { GetHandler as GET };
