import { getAuth } from "@/app/lucia-auth/get-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { user } = await getAuth();
  return NextResponse.json(user);
}
