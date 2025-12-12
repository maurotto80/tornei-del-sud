import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Footer from "@/components/Footer";
import GalleryLightbox from "@/components/GalleryLightbox";
import PageHero from "@/components/PageHero";

/// 👉 FUNZIONE FORMATO DATA ITALIANA
function formatDateIT(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT");
}

export default async function TorneoPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const query = groq`
    *[_type == "torneo" && slug.current == $slug][0]{
      title,
      sottotitolo,
      "slug": slug.current,
      heroImage{ asset->{ url } },
      descrizione,
      categorie,
      anno,
      tipo,
      dataInizio,
      dataFine,
      videoEmbed,

      regolamentoPdf{ asset->{ url } },

      location->{
        title,
        indirizzo,
        citta,
        regione,
        googleMapsUrl,
        googleMapsEmbed
      },

      // Album correlati
      "gallery": *[_type == "galleryAlbum" && torneo._ref == ^._id]{
        title,
        "slug": slug.current,
        immagini[]{ asset->{ url } }
      }
    }
  `;

  const torneo = await sanityClient.fetch(query, { slug });

  if (!torneo) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Torneo non trovato</h1>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* 🔵 HERO FULLWIDTH – SOPRA A TUTTO */}
      <PageHero
        title={torneo.title}
         background={torneo.heroImage?.asset?.url}
      />

      {/* 🔻 CONTENUTO CENTRALE */}
      <div className="p-6 md:p-10 max-w-4xl mx-auto">

        {/* INFO */}
        <div className="mb-6">
          <p><strong>Tipo:</strong> {torneo.tipo}</p>
          <p><strong>Anno:</strong> {torneo.anno}</p>

          {torneo.dataInizio && (
            <p>
              <strong>Date:</strong> {formatDateIT(torneo.dataInizio)} →{" "}
              {formatDateIT(torneo.dataFine)}
            </p>
          )}

          {torneo.categorie?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {torneo.categorie.map((cat: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm font-semibold text-white rounded-full"
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
        </div>

        {/* DESCRIZIONE */}
        <div className="prose max-w-none mb-10">
          {torneo.descrizione?.map((block: any, i: number) => (
            <p key={i}>{block.children?.[0]?.text}</p>
          ))}
        </div>

        {/* VIDEO */}
        {torneo.videoEmbed && (
          <div className="mb-10">
            <iframe
              width="100%"
              height="400"
              src={torneo.videoEmbed}
              className="rounded-xl shadow"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* LOCATION */}
        {torneo.location && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-3">Location</h2>
            <p className="font-semibold">{torneo.location.title}</p>
            <p>{torneo.location.indirizzo}</p>
            <p>{torneo.location.citta} - {torneo.location.regione}</p>

            {torneo.location.googleMapsUrl && (
              <a
                href={torneo.location.googleMapsUrl}
                target="_blank"
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Apri su Google Maps
              </a>
            )}

            {torneo.location.googleMapsEmbed && (
              <div className="mt-4">
                <iframe
                  src={torneo.location.googleMapsEmbed}
                  width="100%"
                  height="320"
                  className="rounded-xl shadow"
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        )}

        {/* GALLERY */}
        {torneo.gallery?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-3">Galleria Immagini</h2>

            {torneo.gallery.map((album: any) => (
              <div key={album.slug} className="mb-10">
                <h3 className="text-xl font-semibold mb-3">{album.title}</h3>

                <GalleryLightbox
                  images={album.immagini.map((img: any) => ({
                    url: img.asset.url,
                  }))}
                />
              </div>
            ))}
          </div>
        )}
         {/* 🔵 TORNA ALLA LISTA TORNEI */}
      <div className="text-center my-12">
        <a
          href="/tornei"
          className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-full transition"
        >
          Torna alla Lista Tornei
        </a>
      </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
