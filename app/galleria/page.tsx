import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default async function GalleriaPage() {
  const query = groq`
  *[_type == "galleryAlbum"] 
    | order(_createdAt desc){
      title,
      "slug": slug.current,
      descrizione,
      immagini[]{ asset->{ url } },

      torneo->{
        title,
        dataInizio,
        dataFine,
        location->{
          title,
          citta
        }
      }
    }
`;
function formatDateIT(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT");
}

  const albums = await sanityClient.fetch(query);

  return (
    <>
      {/* 🔵 PAGE HERO FULL WIDTH */}
      <PageHero
        title="Galleria Fotografica"
        background="/galleria-banner.png"
      />

      {/* 🔻 CONTENUTO GALLERIA */}
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          
        </h1>

       {albums.length === 0 ? (
  // 🌙 Nessun album
  <div className="text-center py-20">
    <div className="inline-block bg-white rounded-xl shadow-lg px-8 py-10">
      <p className="text-4xl mb-4">📷</p>
      <h2 className="text-2xl font-bold mb-2">
        La galleria è in aggiornamento
      </h2>
      <p className="text-gray-600 max-w-md">
        Le foto dei nostri tornei verranno pubblicate a breve.<br />
        Torna presto per scoprire tutti gli album fotografici degli eventi!
      </p>
    </div>
  </div>
) : (
  // ✅ Griglia album
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {albums.map((album: any) => (
      <Link
        key={album.slug}
        href={`/galleria/${album.slug}`}
        className="block bg-white rounded-xl shadow hover:shadow-lg transition"
      >
        <img
          src={
            album.immagini?.[0]?.asset?.url ||
            "https://via.placeholder.com/600x400?text=Album"
          }
          alt={album.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />

        <div className="p-4">
          {album.torneo?.title && (
            <p className="text-orange-600 font-semibold text-sm">
              🏆 {album.torneo.title}
            </p>
          )}

          {album.torneo?.dataInizio && (
            <p className="text-gray-700 text-sm mt-1">
              📅 {formatDateIT(album.torneo.dataInizio)}
              {album.torneo.dataFine
                ? ` → ${formatDateIT(album.torneo.dataFine)}`
                : ""}
            </p>
          )}

          {album.torneo?.location?.title && (
            <p className="text-gray-700 text-sm mt-1">
              📍 {album.torneo.location.title}
              {album.torneo.location.citta
                ? `, ${album.torneo.location.citta}`
                : ""}
            </p>
          )}

          {album.descrizione && (
            <p className="text-gray-600 text-sm mt-3 line-clamp-2">
              {album.descrizione}
            </p>
          )}
        </div>
      </Link>
    ))}
  </div>
)}

      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
