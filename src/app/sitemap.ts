import type { MetadataRoute } from "next";

const SITE_URL = "https://saisaktheeswari.com";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/industries", priority: 0.8 },
  { path: "/training", priority: 0.7 },
  { path: "/careers", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
