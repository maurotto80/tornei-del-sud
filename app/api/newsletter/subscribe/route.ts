import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";
import { sendWelcomeEmail } from "@/lib/mailer";

/* --------------------------------------------------
   SANITY CLIENT
-------------------------------------------------- */
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/* --------------------------------------------------
   POST /api/newsletter/subscribe
-------------------------------------------------- */
export async function POST(req: Request) {
  try {
    /* 1️⃣ Parse & typing body */
    const body = await req.json();

    const name: string | undefined =
  typeof body.name === "string" ? body.name : undefined;
    const email: string | undefined = body.email;
    const privacyAccepted: boolean = body.privacyAccepted === true;

    /* 2️⃣ Validazioni */
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email obbligatoria" },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Devi accettare la privacy policy" },
        { status: 400 }
      );
    }

    /* 3️⃣ Controllo duplicati */
    const existing: number = await sanityClient.fetch(
      `count(*[_type == "newsletterSubscriber" && email == $email])`,
      { email }
    );

    if (existing > 0) {
      return NextResponse.json(
        { error: "Email già iscritta" },
        { status: 409 }
      );
    }

    /* 4️⃣ Generazione token unico */
    const unsubscribeToken: string = crypto.randomUUID();

    /* 5️⃣ Creazione subscriber */
    await sanityClient.create({
      _type: "newsletterSubscriber",
      name,
      email,
      active: true,
      createdAt: new Date().toISOString(),
      privacyAcceptedAt: new Date().toISOString(),
      unsubscribeToken,
    });

    /* 6️⃣ Invio welcome email */
    await sendWelcomeEmail({
      to: email,
      name,
      unsubscribeToken,
    });

    /* 7️⃣ Response */
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NEWSLETTER SUBSCRIBE ERROR:", error);

    return NextResponse.json(
      { error: "Errore server" },
      { status: 500 }
    );
  }
}
