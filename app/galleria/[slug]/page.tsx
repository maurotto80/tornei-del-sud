import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Footer from "@/components/Footer";
import GalleryLightbox from "@/components/GalleryLightbox";
import PageHero from "@/components/PageHero";

export default async function AlbumPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const query = groq`
    *[_type == "galleryAlbum" && slug.current == $slug][0]{
      title,
      descrizione,
      immagini[]{
        asset->{
          url
        }
      },
      video[]{
        title,
        url
      }
    }
  `;

  const album = await sanityClient.fetch(query, { slug });

  if (!album) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Album non trovato</h1>
      </div>
    );
  }

  return (
    <>
      {/* 🔵 PAGE HERO FULL WIDTH */}
          <PageHero title={album.title} background="/galleria-banner.png"
          />

      <div className="p-6 md:p-10 max-w-5xl mx-auto">
 

        {/* DESCRIZIONE */}
        {album.descrizione && (
          <p className="text-gray-600 mb-6">{album.descrizione}</p>
        )}

        {/* LIGHTBOX GALLERY */}
        {album.immagini?.length > 0 && (
          <GalleryLightbox
            images={album.immagini.map((img: any) => ({
              url: img.asset.url,
            }))}
          />
        )}

        {/* VIDEO */}
        {album.video?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Video</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {album.video.map((v: any, i: number) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <iframe
                    width="100%"
                    height="300"
                    src={v.url}
                    className="rounded-xl shadow"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        )}
 {/* TORNA ALLE NEWS */}
        <a
          href="/galleria"
          className="inline-block mt-10 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold"
        >
          Torna alle Galleria
        </a>
      </div>

      <Footer />
    </>
  );
}
