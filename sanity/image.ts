import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./config";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
