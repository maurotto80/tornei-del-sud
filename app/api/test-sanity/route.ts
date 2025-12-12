import { sanityClient } from "@/sanity/config";

export async function GET() {
  try {
    const data = await sanityClient.fetch('*[_type == "siteSettings"][0]');
    return Response.json({ ok: true, data });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
