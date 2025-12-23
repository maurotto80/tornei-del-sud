import { Resend } from "resend";
import React from "react";
import WelcomeEmail from "@/emails/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendWelcomeEmailProps = {
  to: string;
  name?: string;
  unsubscribeToken: string;
};

export async function sendWelcomeEmail({
  to,
  name,
  unsubscribeToken,
}: SendWelcomeEmailProps) {
  console.log("📨 INVIO EMAIL A:", to);

  return resend.emails.send({
    from: process.env.NEWSLETTER_FROM!,
    to,
    subject: "Benvenuto nella newsletter Tornei del Sud",
    react: React.createElement(WelcomeEmail, {
      name,
      unsubscribeToken,
    }),
  });
}
