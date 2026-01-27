// src/components/SEO.tsx

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  image,
  url = window.location.href,
}: SEOProps) {
  const metaImage = image || "/favicon-96x96.png";
  const siteTitle = "Portfolio étudiante en communication";

  return (
    <>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
    </>
  );
}
