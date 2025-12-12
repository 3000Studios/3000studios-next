import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://3000studios.com", priority: 1 },
    { url: "https://3000studios.com/blog", priority: 0.9 },
    { url: "https://3000studios.com/store", priority: 0.9 }
  ];
}
