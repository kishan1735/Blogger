import Blog from "@/models/blogModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectMongoDB from "@/lib/dbConnect";
import { redisClient } from "@/utils/redis";

export async function POST(req: Request): Promise<any> {
  let user: any;
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();
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
    let blog: any = await Blog.create({
      name: data.name,
      publisher: user._id,
      time: new Date(Date.now()),
      plan: data.plan || "normal",
      content: data.content,
      tags: data.tags,
    });
    user = await User.findOneAndUpdate(
      { email: session?.user?.email },
      { $push: { blogs: blog._id } }
    );
    user = await User.findById(user._id);
    await redisClient.set("User :" + userCache, JSON.stringify(user));
    await redisClient.expire("User :" + userCache, 1200);
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

export async function GET() {
  try {
    await connectMongoDB();
    let blogs: any;

    let one_hour_ago = new Date(Date.now() - 60 * 60 * 1000);
    blogs = await Blog.aggregate([
      {
        $project: {
          name: "$name",
          publisher: "$publisher",
          time: "$time",
          content: "$content",
          plan: "$plan",
          recentViewCount: {
            $size: {
              $filter: {
                input: "$views",
                as: "item",
                cond: {
                  $gte: ["$$item.time", one_hour_ago],
                },
              },
            },
          },
        },
      },
      {
        $sort: { recentViewCount: -1, _id: 1 },
      },
    ]).exec();
    if (blogs.length == 0) {
      throw new Error("Blogs Not Found");
    }
    return NextResponse.json({ status: "success", blogs });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
