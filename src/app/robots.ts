import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
