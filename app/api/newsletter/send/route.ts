import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Resend } from "resend";
import React from "react";
import { renderNewsletter } from "@/emails/renderNewsletter";

export const dynamic = "force-dynamic";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "http://localhost:3333",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

type Subscriber = {
  email: string;
  unsubscribeToken: string;
};

type Newsletter = {
  title: string;
  subject: string;
  template: string;
  content: any;
};

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: Request) {
  try {
    const body: { newsletterId?: string } = await req.json();

    if (!body.newsletterId) {
      return NextResponse.json(
        { error: "newsletterId mancante" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const newsletter: Newsletter | null = await sanityClient.fetch(
      `*[_type == "newsletter" && _id == $id][0]{
        title,
        subject,
        template,
        content
      }`,
      { id: body.newsletterId }
    );
    console.log("NEWSLETTER RAW:", newsletter);
console.log("NEWSLETTER CONTENT:", newsletter?.content);
console.log("CONTENT TYPE:", typeof newsletter?.content);
console.log("IS ARRAY:", Array.isArray(newsletter?.content));

    if (!newsletter) {
      return NextResponse.json(
        { error: "Newsletter non trovata" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const subscribers: Subscriber[] = await sanityClient.fetch(
      `*[_type == "newsletterSubscriber" && active == true]{
        email,
        unsubscribeToken
      }`
    );

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: "Nessun iscritto attivo" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const BATCH_SIZE: number = 100;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch: Subscriber[] = subscribers.slice(i, i + BATCH_SIZE);

      await Promise.all(
        batch.map((sub: Subscriber) =>
          resend.emails.send({
            from: process.env.NEWSLETTER_FROM!,
            to: sub.email,
            subject: newsletter.subject,
            react: renderNewsletter({
              template: newsletter.template,
              title: newsletter.title,
              content: newsletter.content,
              unsubscribeToken: sub.unsubscribeToken,
            }),
          })
        )
      );

      await sleep(1000);
    }

    await sanityClient
      .patch(body.newsletterId)
      .set({
        status: "sent",
        sentAt: new Date().toISOString(),
      })
      .commit();

    return NextResponse.json(
      { success: true, sent: subscribers.length },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("NEWSLETTER SEND ERROR:", error);

    return NextResponse.json(
      { error: "Errore invio newsletter" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
