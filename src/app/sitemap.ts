import { MetadataRoute } from 'next';

<<<<<<< HEAD
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3000studios.com';
=======
<<<<<<< HEAD
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://3000studios.xyz';
>>>>>>> origin/copilot/update-main-with-all-branches
  
  // Static pages
  const staticPages = [
    '',
<<<<<<< HEAD
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
=======
    '/blog',
    '/contact',
    '/portfolio',
    '/projects',
    '/store',
    '/vendors',
    '/apps/ai-automation-toolkit',
    '/apps/ai-content-writer-pro',
    '/apps/ai-video-editor',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: Add dynamic blog posts and products when available
  // You can fetch these from your database/CMS
  
  return staticPages;
=======
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://3000studios.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/live`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
>>>>>>> origin/copilot/update-best-options
>>>>>>> origin/copilot/update-main-with-all-branches
}
