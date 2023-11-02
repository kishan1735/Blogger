import Tag from "@/models/tagModel";
import { NextResponse } from "next/server";

async function GET(req: Request) {
  try {
    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
