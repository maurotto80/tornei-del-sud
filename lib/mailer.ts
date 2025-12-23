import { Resend } from "resend";
import React from "react";
import WelcomeEmail from "@/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  console.log("📨 INVIO EMAIL A:", email);

  return resend.emails.send({
    from: process.env.NEWSLETTER_FROM!,
    to: email,
    subject: "Benvenuto nella newsletter Tornei del Sud",
    react: React.createElement(WelcomeEmail, { name }),
  });
}
