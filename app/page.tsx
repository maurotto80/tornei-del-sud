// app/page.tsx
import groq from "groq";
import { sanityClient } from "@/sanity/config";
import Header from "@/components/Header";
import HomeHeroSlider from "@/components/HomeHeroSlider";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";

export default async function HomePage() {
  /* -------------------------------------------
     HERO SLIDER
  ------------------------------------------- */
  const sliderQuery = groq`
    *[_type == "homeSlide" && active == true][0]{
      slides[]{
        title,
        subtitle,
        description,
        buttonLabel,
        buttonLink,
        textColor,
        titleSize,
        fontFamily,
        textPosition,
        overlayOpacity,
        duration,
        "images": [{
          "asset": image.asset->{ url }
        }]
      }
    }
  `;

  const sliderData = await sanityClient.fetch(sliderQuery);
  const slides = sliderData?.slides ?? [];


  /* -------------------------------------------
     TORNEI IN EVIDENZA
  ------------------------------------------- */
  const evidenzaQuery = groq`
    *[_type == "torneo" && isEvidenza == true] 
      | order(anno desc){
        title,
        sottotitolo,
        "slug": slug.current,
        anno,
        categorie,
        location->{ title, citta, regione },
        dataInizio,
        dataFine,
        heroImage{ asset->{ url } }
      }
  `;
  const evidenza = await sanityClient.fetch(evidenzaQuery);

  return (
    <div className="w-full">
      <Header />

      {/* -------------------------------------------
          HERO SLIDER
      ------------------------------------------- */}
      {Array.isArray(slides) && slides.length > 0 && (
        <HomeHeroSlider slides={slides} />
      )}

      {/* -------------------------------------------
          TITOLO PROSSIMI EVENTI
      ------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-14 mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider uppercase text-orange-500">
          Prossimi Eventi
        </h2>
      </div>

      {/* -------------------------------------------
          TORNEI IN EVIDENZA
      ------------------------------------------- */}
      <section className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {evidenza.map((torneo: any) => (
            <Link
              key={torneo.slug}
              href={`/tornei/${torneo.slug}`}
              className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {torneo.heroImage?.asset?.url && (
                <img
                  src={torneo.heroImage.asset.url}
                  alt={torneo.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <h3 className="text-xl font-bold mb-2">{torneo.title}</h3>

              {torneo.categorie?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
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
                          "#d81b60",
                        ][i % 5],
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {torneo.location && (
                <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                  <span>📍</span>
                  <span>{torneo.location.title}</span>
                </div>
              )}

              {torneo.dataInizio && torneo.dataFine && (
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span>📅</span>
                  <span>
                    {new Date(torneo.dataInizio).toLocaleDateString("it-IT")}
                    {" - "}
                    {new Date(torneo.dataFine).toLocaleDateString("it-IT")}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------------------------
          NEWSLETTER
      ------------------------------------------- */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('/bg-newsletter.jpg')" }}
      >
        <div className="absolute inset-0 bg-blue-900/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
          <div>
            <h2 className="text-white text-4xl md:text-6xl font-extrabold uppercase">
              Iscriviti alla <br />
              <span className="text-orange-500">Newsletter</span>
            </h2>

            <p className="text-white/90 mt-6 text-lg max-w-md">
              Rimani aggiornato su eventi, offerte e novità.
            </p>
          </div>

          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
