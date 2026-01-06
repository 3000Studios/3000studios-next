/**
 * Affiliate System
 * Inject affiliate links and track commissions
 */

export interface AffiliateProduct {
  id: string;
  name: string;
  affiliateLink: string;
  commission: number;
  commissionType: 'percentage' | 'fixed';
  platform: 'amazon' | 'clickbank' | 'gumroad' | 'custom';
  category: string;
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: 'aff_1',
    name: 'Premium Web Hosting',
    affiliateLink: 'https://partner.example.com/hosting?ref=3000studios',
    commission: 25,
    commissionType: 'percentage',
    platform: 'custom',
    category: 'Hosting',
  },
  {
    id: 'aff_2',
    name: 'Design Tool Pro',
    affiliateLink: 'https://partner.example.com/design-pro?ref=3000studios',
    commission: 50,
    commissionType: 'fixed',
    platform: 'custom',
    category: 'Tools',
  },
  // Add more affiliate products here
];

// Affiliate link generators for revenue pages
export const AFFILIATES = {
  general: (url: string) => `${url}?ref=3000studios`,
  amazon: (asin: string) => `https://www.amazon.com/dp/${asin}?tag=3000studios-20`,
  clickbank: (product: string) =>
    `https://hop.clickbank.net/?affiliate=3000studios&vendor=${product}`,
  gumroad: (product: string) => `https://gumroad.com/l/${product}?wanted=true&referrer=3000studios`,
};

export function getAffiliateProduct(id: string): AffiliateProduct | undefined {
  return affiliateProducts.find((p) => p.id === id);
}

export function getAffiliateProductsByCategory(category: string): AffiliateProduct[] {
  return affiliateProducts.filter((p) => p.category === category);
}

export function injectAffiliateLink(
  content: string,
  keywords: string[],
  affiliateLink: string
): string {
  let result = content;
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    result = result.replace(
      regex,
      `<a href="${affiliateLink}" target="_blank" rel="noopener noreferrer sponsored">${keyword}</a>`
    );
  });
  return result;
}

export function trackAffiliateClick(affiliateId: string): void {
  // Track affiliate click for commission attribution
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'affiliate_click',
        properties: {
          affiliateId,
          timestamp: Date.now(),
        },
      }),
    }).catch((err) => console.error('', _err));
  }
}
