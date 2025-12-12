import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/config";

export async function GET() {
  try {
    const query = `
      *[_type == "siteSettings"][0]{
        title,
        email,
        telefono,
        indirizzo,
        logo,
        social,
        poweredBy
      }
    `;

    const data = await sanityClient.fetch(query);

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
