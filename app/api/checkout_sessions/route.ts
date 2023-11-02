import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Cors from "micro-cors";
import connectMongoDB from "@/lib/dbConnect";
import { redisClient } from "@/utils/redis";

const cors = Cors({
  allowMethods: ["POST", "GET", "HEAD"],
});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request): Promise<any> {
  let user: any;
  try {
    const session = await getServerSession();
    let userCache = session?.user?.email;
    await connectMongoDB();
    const data = await req.json();
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
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Wallet Payment",
            },
            currency: "inr",
            unit_amount: data.amount * 100,
          },
          quantity: 1,
        },
      ],
      client_reference_id: user?._id,
      currency: "inr",
      success_url: `${process.env.URL}/api/wallet/${data.amount.toString()}`,
      cancel_url: `${process.env.URL}/wallet`,
    };
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    return NextResponse.json({ status: "success", session: checkoutSession });
  } catch (err: any) {
    console.log("error");
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
