import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa6";
import Link from "./Link";

type SocialNetwork =
  | "instagram"
  | "linkedin"
  | "github"
  | "twitter"
  | "website";

interface SocialIconProps {
  network: SocialNetwork;
  href: string;
  size?: number;
  className?: string;
}

const iconMap: Record<SocialNetwork, IconType> = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  twitter: FaTwitter,
  website: FaGlobe,
};

export default function SocialIcon({
  network,
  href,
  size = 24,
  className = "",
}: SocialIconProps) {
  const IconComponent = iconMap[network];

  return (
    <Link
      href={href}
      className={`social-icon ${className}`}
      style={{
        display: "inline-flex",
      }}
    >
      <IconComponent size={size} />
    </Link>
  );
}
