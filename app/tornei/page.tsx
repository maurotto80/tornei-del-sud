//app/tornei/page.tsx

import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const BROCHURE_PDF_URL = "/BROCHURE_TORNEI_DEL_SUD_2026.pdf";

export const metadata = {
  title: "Tornei di Calcio Giovanile | Tornei del Sud",
  description:
    "Scopri tutti i tornei di calcio giovanile organizzati da Tornei del Sud. Eventi sportivi, competizioni e tornei per giovani calciatori.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tornei`,
  },
  openGraph: {
    title: "Tornei di Calcio Giovanile | Tornei del Sud",
    description:
      "Scopri tutti i tornei di calcio giovanile organizzati da Tornei del Sud.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tornei`,
    siteName: "Tornei del Sud",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/torneo-banner.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default async function TorneiPage() {
  const query = groq`
    *[_type == "torneo"] 
  | order(_createdAt asc){
    title,
    sottotitolo,
    "slug": slug.current,
    categorie,
    anno,
    heroImage{
      asset->{ url }
    }
  }

  `;

  const tornei = await sanityClient.fetch(query);

  return (
    <>
      {/* 🔵 PAGE HERO FULL WIDTH */}
      <PageHero
        title="Tornei"
        background="/torneo-banner.png"
      />

      {/* 🔻 CONTENUTO ESISTENTE — NON HO TOCCATO NULLA */}
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
  <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
  Tornei di Calcio Giovanile
</h1>

  {/* 🔹 BOTTONI BROCHURE */}
  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
    
    {/* 📥 Scarica */}
    <a
      href={BROCHURE_PDF_URL}
      target="_blank"
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center transition"
    >
      📥 Scarica Brochure
    </a>

    {/* 📖 Sfoglia */}
    
   <Link href="/brochure" target="_blank" rel="noopener noreferrer"
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center transition"
    >
  📖 Sfoglia Online
</Link>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {tornei.map((torneo: any) => (
            <Link
              key={torneo.slug}
              href={`/tornei/${torneo.slug}`}
              className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {/* IMMAGINE */}
              <img
                src={
                  torneo.heroImage?.asset?.url ||
                  "https://via.placeholder.com/600x400?text=Torneo"
                }
                alt={`Torneo ${torneo.title} - Tornei del Sud`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* TITOLO */}
              <h2 className="text-xl font-bold">{torneo.title}</h2>

              {/* SOTTOTITOLO */}
              {torneo.sottotitolo && (
                <p className="text-gray-600 text-sm mb-2">{torneo.sottotitolo}</p>
              )}

              {/* CATEGORIE */}
              {torneo.categorie?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {torneo.categorie.map((cat: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-semibold text-white rounded-full"
                      style={{
                        backgroundColor: [
                          "#1e88e5",
                          "#43a047",
                          "#fb8c00",
                          "#8e24aa",
                        ][i % 4],
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* ANNO */}
              {torneo.anno && (
                <p className="mt-3 text-sm font-medium">🗓 {torneo.anno}</p>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER FULL WIDTH */}
      <Footer />
    </>
  );
}
