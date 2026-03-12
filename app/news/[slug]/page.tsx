import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { PortableText } from "@portabletext/react";

export default async function NewsArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const query = groq`
    *[_type == "news" && slug.current == $slug][0]{
      title,
      excerpt,
      publishedAt,
      content,
      contentHtml,
      cover{
        asset->{ url }
      }
    }
  `;

  const article = await sanityClient.fetch(query, { slug });

  if (!article) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Articolo non trovato</h1>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* HERO */}
      <PageHero title={article.title} background="/news-banner.png" />

      {/* CONTENUTO */}
      <div className="p-6 md:p-10 max-w-3xl mx-auto">

        {/* DATA */}
        <p className="text-gray-500 text-sm mb-4">
          News del {new Date(article.publishedAt).toLocaleDateString("it-IT")}
        </p>

        {/* IMMAGINE */}
        {/* IMMAGINE GRANDE COME IN LISTA */}
{/* IMMAGINE HERO NEWS */}
{article.cover?.asset?.url && (
  <img
    src={article.cover.asset.url}
    alt={article.title}
    className="w-full h-[340px] md:h-[400px] object-cover rounded-xl shadow-lg mb-10"
  />
        )}

        {/* CONTENUTO ARTICOLO */}
        <div className="prose prose-lg max-w-none">

          {/* 👉 Se esiste HTML avanzato */}
          {article.contentHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <PortableText value={article.content} />
          )}

        </div>

        {/* TORNA ALLE NEWS */}
        <a
          href="/news"
          className="inline-block mt-10 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold"
        >
          Torna alle News
        </a>

      </div>

      <Footer />
    </div>
  );
}
