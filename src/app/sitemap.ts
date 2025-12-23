import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://3000studios.xyz";

  // Static pages
  const staticPages = [
    "",
    "/blog",
    "/contact",
    "/portfolio",
    "/projects",
    "/store",
    "/vendors",
    "/apps/ai-automation-toolkit",
    "/apps/ai-content-writer-pro",
    "/apps/ai-video-editor",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // TODO: Add dynamic blog posts and products when available
  // You can fetch these from your database/CMS

  return staticPages;
}
