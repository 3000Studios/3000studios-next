import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
<<<<<<< HEAD
=======
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://3000studios.xyz';
  
>>>>>>> origin/copilot/update-main-with-all-branches
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/matrix/',
<<<<<<< HEAD
          '/login/',
          '/_next/',
          '/private/',
        ],
      },
    ],
    sitemap: 'https://3000studios.com/sitemap.xml',
=======
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
>>>>>>> origin/copilot/update-main-with-all-branches
  };
}
