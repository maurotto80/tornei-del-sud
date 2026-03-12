import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Footer from "@/components/Footer";
import GalleryLightbox from "@/components/GalleryLightbox";
import PageHero from "@/components/PageHero";
import { PortableText } from "@portabletext/react";

/// 👉 FUNZIONE FORMATO DATA ITALIANA
function formatDateIT(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT");
}

export async function generateMetadata({ params }: any) {

  const torneo = await sanityClient.fetch(
    `*[_type == "torneo" && slug.current == $slug][0]{
      title,
      sottotitolo,
      heroImage{ asset->{ url } }
    }`,
    { slug: params.slug }
  );

  const title = `${torneo.title} | Tornei del Sud`;

const description =
  torneo.sottotitolo ||
  `Scopri il torneo ${torneo.title} organizzato da Tornei del Sud`;

const image =
  torneo.heroImage?.asset?.url ||
  `${process.env.NEXT_PUBLIC_SITE_URL}/default-og.jpg`;

return {
  title,
  description,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tornei/${params.slug}`,
  },

  openGraph: {
    title,
    description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tornei/${params.slug}`,
    siteName: "Tornei del Sud",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
    locale: "it_IT",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};
}

export default async function TorneoPage(
  props: { params: { slug: string } }
) {
  const { slug } = props.params;

  const query = groq`
    *[_type == "torneo" && slug.current == $slug][0]{
      title,
      sottotitolo,
      "slug": slug.current,
      heroImage{ asset->{ url } },
      descrizione,
      descrizioneHtml,
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
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: torneo.title,
      description: torneo.sottotitolo,
      startDate: torneo.dataInizio,
      endDate: torneo.dataFine,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",

      location: {
        "@type": "Place",
        name: torneo.location?.title,
        address: {
          "@type": "PostalAddress",
          streetAddress: torneo.location?.indirizzo,
          addressLocality: torneo.location?.citta,
          addressRegion: torneo.location?.regione,
          addressCountry: "IT",
        },
      },

      image: torneo.heroImage?.asset?.url,

      organizer: {
        "@type": "Organization",
        name: "Tornei del Sud",
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
    }),
  }}
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
        <h1 className="text-3xl font-bold mb-6">{torneo.title}</h1>
<div className="prose max-w-none mb-10">
  {torneo.descrizioneHtml ? (
    <div
      dangerouslySetInnerHTML={{ __html: torneo.descrizioneHtml }}
    />
  ) : (
    <PortableText value={torneo.descrizione} />
  )}
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
