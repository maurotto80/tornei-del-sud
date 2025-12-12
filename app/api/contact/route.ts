import { sanityClient } from "@/sanity/config";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    // Validazione
    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    // CREA DOCUMENTO IN SANITY
    await sanityClient.create({
      _type: "contact",
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString()
    });

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("Contact API Error:", error);
    return new Response("Server error", { status: 500 });
  }
}
