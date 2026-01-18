import type { SanityImageSource } from "./sanityClient";

export interface Project {
  _id: string;
  _createdAt?: string;
  layout: string;
  miniature: SanityImageSource;
  titre: string;
  soustitre: string;
  slug: string;
  description_principale: string;
  description_secondaire: string;
  features_list: string[];
  categorie: {
    nom: string;
    slug: string;
  };
  image_principale: SanityImageSource;
  galerie: {
    _key: string;
    label: string;
    image: SanityImageSource;
  }[];
}

export interface Categorie {
  _id: string;
  nom: string;
  slug: string;
}
