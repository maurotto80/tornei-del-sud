import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export const dynamic = "force-dynamic";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

type SubscriberResult = {
  _id: string;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const unsubscribeToken: string | null =
      url.searchParams.get("token");

    if (!unsubscribeToken) {
      return NextResponse.json(
        { error: "Token mancante" },
        { status: 400 }
      );
    }

    const subscriber = await sanityClient.fetch<SubscriberResult | null>(
      `*[_type == "newsletterSubscriber" && unsubscribeToken == $unsubscribeToken][0]{
        _id
      }`,
      { unsubscribeToken }
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: "Token non valido" },
        { status: 404 }
      );
    }

    await sanityClient
      .patch(subscriber._id)
      .set({ active: false })
      .commit();

    return NextResponse.redirect(
  `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe`,
  { status: 302 }
);
  } catch (error) {
    console.error("UNSUBSCRIBE ERROR:", error);
    return NextResponse.json(
      { error: "Errore server" },
      { status: 500 }
    );
  }
}
