import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Cors from "micro-cors";

const cors = Cors({
  allowMethods: ["POST", "GET", "HEAD"],
});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getCheckoutSession(req: Request) {
  try {
    const session = await getServerSession();
    const user: any = User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found...Login for access");
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
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      client_reference_id: user?._id,
      currency: "inr",
      success_url: `http://localhost:3000/api/wallet`,
      cancel_url: `http://localhost:3000/wallet`,
    };
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    return NextResponse.json({ status: "success", session: checkoutSession });
  } catch (err: any) {
    console.log("error");
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { getCheckoutSession as GET };
