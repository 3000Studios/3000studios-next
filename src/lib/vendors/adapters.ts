import { normalizeVendorProduct } from "./normalize";
import { VendorProduct } from "./types";

export type VendorAdapter = {
  id: string;
  fetchProducts: (feedUrl: string) => Promise<VendorProduct[]>;
};

interface RawVendorItem {
  advertiserId?: string;
  id?: string;
  sku?: string;
  name?: string;
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  priceCurrency?: string;
  imageUrl?: string;
  image?: string;
  link?: string;
  url?: string;
  category?: string;
  [key: string]: unknown;
}

async function fetchJson(feedUrl: string): Promise<{ items?: RawVendorItem[]; data?: RawVendorItem[]; [key: string]: unknown }> {
  const res = await fetch(feedUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch feed ${feedUrl}: ${res.status}`);
  return res.json();
}

export const cjAdapter: VendorAdapter = {
  id: "cj",
  fetchProducts: async (feedUrl: string) => {
    const data = await fetchJson(feedUrl);
    const items = Array.isArray(data?.items) ? data.items : data?.data || [];
    return items.map((item: RawVendorItem) =>
      normalizeVendorProduct("cj", {
        id: item.advertiserId || item.id,
        sku: item.sku,
        name: item.name || item.title,
        description: item.description,
        price: item.price,
        currency: item.currency || item.priceCurrency,
        image: item.imageUrl || item.image,
        url: item.link || item.url,
        category: item.category,
        commission: item.commission || item.commissionRate,
      })
    );
  },
};

export const shareasaleAdapter: VendorAdapter = {
  id: "shareasale",
  fetchProducts: async (feedUrl: string) => {
    const data = await fetchJson(feedUrl);
    const items = Array.isArray(data?.products) ? data.products : data?.items || [];
    return items.map((item: RawVendorItem) =>
      normalizeVendorProduct("shareasale", {
        id: item.merchantId || item.id,
        sku: item.sku,
        name: item.title || item.name,
        description: item.description,
        price: item.price,
        currency: item.currency || item.currencyCode,
        image: item.image || item.imageUrl,
        url: item.trackingUrl || item.url,
        category: item.category,
        commission: item.commission,
      })
    );
  },
};

export const amazonAdapter: VendorAdapter = {
  id: "amazon",
  fetchProducts: async (feedUrl: string) => {
    const data = await fetchJson(feedUrl);
    const items = Array.isArray(data?.products) ? data.products : data?.items || [];
    return items.map((item: RawVendorItem) =>
      normalizeVendorProduct("amazon", {
        id: item.asin || item.id,
        sku: item.sku,
        name: item.title || item.name,
        description: item.description,
        price: item.price,
        currency: item.currency || item.currencyCode,
        image: item.image || item.image_url,
        url: item.detailPageURL || item.url,
        category: item.category,
        commission: item.commission,
      })
    );
  },
};

export const shopifyAdapter: VendorAdapter = {
  id: "shopify",
  fetchProducts: async (feedUrl: string) => {
    const data = await fetchJson(feedUrl);
    const items = Array.isArray(data?.products) ? data.products : [];
    return items.map((item: RawVendorItem) =>
      normalizeVendorProduct("shopify", {
        id: item.id,
        sku: item.handle,
        name: item.title,
        description: item.body_html,
        price: item.variants?.[0]?.price,
        currency: item.variants?.[0]?.currency || "USD",
        image: item.images?.[0]?.src,
        url: item.handle ? `/products/${item.handle}` : item.onlineStoreUrl,
        category: item.product_type,
        commission: item.commission,
      })
    );
  },
};

export const vendorAdapters: Record<string, VendorAdapter> = {
  cj: cjAdapter,
  shareasale: shareasaleAdapter,
  amazon: amazonAdapter,
  shopify: shopifyAdapter,
};
