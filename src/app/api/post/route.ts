import { db } from "@/db";
import { emails } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subject, to, date, body } = await req.json();

  const email = await db.insert(emails).values({
    to,
    from: "",
    subject,
    date,
    body,
  });

  return NextResponse.json(email);
}
