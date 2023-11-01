import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Pay from "@/models/payModel";
import User from "@/models/userModel";
import { NextApiRequest } from "next";

async function createPayCheckout(req: Request, { params }: { params: any }) {
  try {
    const session = await getServerSession(authOptions);
    let user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      throw new Error("User not found");
    }
    const pay = await Pay.create({
      amount: 500,
      buyerId: user._id.toString(),
      time: Date.now(),
    });
    await User.findByIdAndUpdate(user._id, {
      walletBalance: user.walletBalance + Number(params.amount),

      $push: {
        transactionHistory: {
          for: "wallet",
          amount: +params.amount,
          time: Date.now(),
        },
      },
    });
    return NextResponse.redirect("http://localhost:3000/wallet");
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export { createPayCheckout as GET };
