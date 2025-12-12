import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default async function TorneiPage() {
  const query = groq`
    *[_type == "torneo"] 
      | order(anno desc, title asc){
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8"></h1>

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
                alt={torneo.title}
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
