import { VendorProduct } from "./types";

interface RawVendorProduct {
  id?: string;
  sku?: string;
  name?: string;
  title?: string;
  description?: string;
  price?: number | string;
  currency?: string;
  image?: string;
  image_url?: string;
  url?: string;
  affiliate_link?: string;
  category?: string;
  commission?: number;
  [key: string]: unknown;
}

export function normalizeVendorProduct(
  vendorId: string,
  raw: RawVendorProduct
): VendorProduct {
  return {
    vendorId,
    vendorProductId: raw.id || raw.sku,
    name: raw.name || raw.title,
    description: raw.description || "",
    price: Number(raw.price),
    currency: raw.currency || "USD",
    image: raw.image || raw.image_url,
    url: raw.url || raw.affiliate_link,
    category: raw.category,
    commissionRate: raw.commission,
  };
}
