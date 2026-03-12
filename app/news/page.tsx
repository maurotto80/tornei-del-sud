import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";


// ⭐ FUNZIONE ESTRATTO — mettila QUI
function getExcerpt(item: any, words = 25) {
  // 1) Se esiste excerpt manuale → usa quello
  if (item.excerpt) return item.excerpt;

  // 2) Se esiste HTML avanzato → estrai testo da HTML
  if (item.contentHtml) {
    const plain = item.contentHtml.replace(/<[^>]+>/g, " ");
    const excerpt = plain.split(" ").slice(0, words).join(" ");
    return excerpt + "...";
  }

  // 3) Fallback Portable Text
  if (item.content) {
    const blocks = item.content
      .filter((b: any) => b._type === "block")
      .map((b: any) =>
        b.children.map((c: any) => c.text).join(" ")
      )
      .join(" ");

    const excerpt = blocks.split(" ").slice(0, words).join(" ");
    return excerpt + "...";
  }

  return "";
}



// ⭐ COMPONENTE PAGINA — sotto la funzione
export default async function NewsPage() {
  const query = groq`
    *[_type == "news"] | order(publishedAt desc){
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
      cover{
        asset->{ url }
      },
      content[],
      contentHtml
    }
  `;

  const news = await sanityClient.fetch(query);

  return (
    <div className="w-full">
      {/* HERO */}
      <PageHero
        title="News"
        background="/news-banner.png"
      />

      <div className="max-w-6xl mx-auto p-6 md:p-10">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item: any) => {

            const imageUrl =
              item.cover?.asset?.url ||
              "/placeholder-news.jpg";

            return (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* COVER */}
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">
                    {item.publishedAt &&
                      new Date(item.publishedAt).toLocaleDateString("it-IT")}
                  </p>

                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>

                  {/* ESTRATTO */}
                 <p className="text-gray-600 text-sm mb-3">
  {getExcerpt(item, 25)}
</p>

                  <span className="text-blue-600 font-semibold text-sm hover:underline">
                    Leggi tutto →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

      <Footer />
    </div>
  );
}
