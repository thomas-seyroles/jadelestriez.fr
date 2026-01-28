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
  const siteUrl = "https://jadelestriez-fr.pages.dev";

  // Structured Data (JSON-LD) for Sitelinks
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jade Lestriez Portfolio",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/projets?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": "Projets",
        "url": `${siteUrl}/projets`,
        "description": "Découvrez mes projets en communication et design."
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Contact",
        "url": `${siteUrl}/contact`,
        "description": "Contactez-moi pour toute collaboration."
      }
    ]
  };

  return (
    <>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />

      {/* JSON-LD Schema for Google Sitelinks */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

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
