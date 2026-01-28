import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser to support local development without dotenv dependency
function loadEnv() {
  // Try .env.development.local first, then .env
  const envFiles = [".env.development.local", ".env"];

  for (const file of envFiles) {
    const envPath = path.resolve(__dirname, `../${file}`);
    if (fs.existsSync(envPath)) {
      console.log(`Loading env from ${file}`);
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^['"]|['"]$/g, ""); // Remove quotes
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
      return; // Stop after first successful load
    }
  }
}

loadEnv();

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET;

if (!projectId || !dataset) {
  console.warn(
    "Warning: Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET. Sitemap will only contain static routes.",
  );
}

// Initialize client only if config exists
const client =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        useCdn: true,
        apiVersion: "2025-12-26",
      })
    : null;

const DOMAIN = "https://jadelestriez.fr";

async function generateSitemap() {
  console.log("Generating sitemap...");

  let projects = [];
  if (client) {
    try {
      console.log("Fetching projects from Sanity...");
      const query = `*[_type == "projet"]{ "slug": slug.current, _updatedAt }`;
      projects = await client.fetch(query);
      console.log(`Found ${projects.length} projects.`);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
    }
  }

  const staticRoutes = [
    { path: "", priority: "1.0" },
    { path: "/projets", priority: "0.9" },
    { path: "/contact", priority: "0.8" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("")}
  ${projects
    .map(
      (project) => `
  <url>
    <loc>${DOMAIN}/projets/${project.slug}</loc>
    <lastmod>${project._updatedAt ? project._updatedAt.split("T")[0] : new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.resolve(publicDir, "sitemap.xml");
  fs.writeFileSync(outputPath, xml);
  console.log(`✅ Sitemap generated at ${outputPath}`);
}

generateSitemap().catch(console.error);
