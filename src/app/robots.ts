import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/matrix/',
          '/login/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://3000studios.com/sitemap.xml',
  };
}
