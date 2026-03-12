import { sanityClient } from "@/sanity/config";

export default async function sitemap() {

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const tornei = await sanityClient.fetch(
    `*[_type == "torneo"]{
      "slug": slug.current,
      _updatedAt
    }`
  );

  const torneoUrls = tornei.map((t: any) => ({
    url: `${baseUrl}/tornei/${t.slug}`,
    lastModified: t._updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/tornei`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...torneoUrls,
  ];
}