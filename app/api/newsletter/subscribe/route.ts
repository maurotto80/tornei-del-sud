import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { name, email, privacyAccepted } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email obbligatoria" },
        { status: 400 }
      );
    }

    // 🔍 Controllo duplicati
    const existing = await sanityClient.fetch(
      `count(*[_type == "newsletterSubscriber" && email == $email])`,
      { email }
    );
    if (!privacyAccepted) {
  return NextResponse.json(
    { error: "Devi accettare la privacy policy" },
    { status: 400 }
  );
}

    if (existing > 0) {
      return NextResponse.json(
        { error: "Email già iscritta" },
        { status: 409 }
      );
    }

    // ✅ GENERAZIONE TOKEN (QUESTO TI MANCAVA)
    const unsubscribeToken = crypto.randomUUID();

    // ✍️ Creazione subscriber
    await sanityClient.create({
  _type: "newsletterSubscriber",
  name: name || "",
  email,
  active: true,
  createdAt: new Date().toISOString(),
  privacyAcceptedAt: new Date().toISOString(),
  unsubscribeToken: crypto.randomUUID(),
});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NEWSLETTER SUBSCRIBE ERROR:", error);
    return NextResponse.json(
      { error: "Errore server" },
      { status: 500 }
    );
  }
}
