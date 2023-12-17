import { NextResponse } from "next/server";

export async function GET(req, res) {
  return NextResponse.json(
    { dummyData: "hellow world", status: 200 },
    { status: 200 }
  );
}
