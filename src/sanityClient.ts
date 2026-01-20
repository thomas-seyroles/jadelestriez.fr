import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-12-26",
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type { SanityImageSource };
