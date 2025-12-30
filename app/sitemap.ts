import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3000studios.com';
  
  // Static pages
  const staticPages = [
    '',
    '/store',
    '/projects',
    '/portfolio',
    '/blog',
    '/live',
    '/contact',
  ];

  // Revenue pages
  const revenuePages = [
    '/revenue/best-gaming-laptops-2025',
    '/revenue/best-passive-income-tools',
    '/revenue/ultimate-developer-setup',
    '/revenue/web-design-trends-2025',
    '/revenue/best-ai-tools-for-creators',
  ];

  const allPages = [...staticPages, ...revenuePages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1.0 : page.startsWith('/revenue') ? 0.8 : 0.9,
  }));
}
