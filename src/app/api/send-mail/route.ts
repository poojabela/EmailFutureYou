import { db } from "@/db";
import { emails } from "@/db/schema";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "poojabelaramani51@gmail.com",
    pass: process.env.BREVO_API_KEY,
  },
});

function formatDateString(dateString: string) {
  const parts = dateString.split("-");

  const formattedParts = parts.map((part) => {
    return part.length === 1 ? "0" + part : part;
  });

  return formattedParts.join("-");
}

export async function GET() {
  const today = new Date();
  const todatDate = formatDateString(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
  );

  const todaysEmails = await db
    .select()
    .from(emails)
    .where(eq(emails.date, todatDate));

  for (const email of todaysEmails) {
    await transporter.sendMail({
      from: "poojabelaramani51@gmail.com",
      to: email.to,
      subject: email.subject,
      text: email.body,
    });
  }

  return new Response("Sent");
}
