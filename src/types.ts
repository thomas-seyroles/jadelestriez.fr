import type { SanityImageSource } from "./sanityClient";

export interface Project {
  _id: string;
  _createdAt?: string;
  layout: string;
  titre: string;
  subtitle?: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  categorie: {
    nom: string;
    slug: string;
  };
  thumbnail: SanityImageSource;
  mainImage: SanityImageSource;
  gallery?: SanityImageSource[];
}

export interface Categorie {
  _id: string;
  nom: string;
  slug: string;
}
