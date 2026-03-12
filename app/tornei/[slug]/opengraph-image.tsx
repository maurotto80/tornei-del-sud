import { ImageResponse } from "next/og";
import { sanityClient } from "@/sanity/config";
import groq from "groq";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: any) {

  const torneo = await sanityClient.fetch(
    groq`
      *[_type == "torneo" && slug.current == $slug][0]{
        title,
        sottotitolo,
        heroImage{ asset->{ url } }
      }
    `,
    { slug: params.slug }
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundImage: `url(${torneo.heroImage?.asset?.url})`,
          backgroundSize: "cover",
          color: "white",
          padding: "60px",
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          {torneo.title}
          <div style={{ fontSize: 32, marginTop: 10 }}>
            Tornei del Sud
          </div>
        </div>
      </div>
    ),
    size
  );
}