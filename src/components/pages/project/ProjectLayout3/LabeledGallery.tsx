import LabeledImage from "./LabeledImage";
import { type SanityImageSource } from "../../../../sanityClient";
import styles from "../../../../styles/project/ProjectLayout3.module.css";

interface LabeledGalleryItem {
  _key: string;
  label: string;
  image: SanityImageSource;
}

interface LabeledGalleryProps {
  items: LabeledGalleryItem[];
}

export default function LabeledGallery({ items }: LabeledGalleryProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles['layout3-gallery']}>
      {items.map((item, index) => (
        <LabeledImage
          key={item._key}
          image={item.image}
          label={item.label}
          id={index}
        />
      ))}
    </div>
  );
}
