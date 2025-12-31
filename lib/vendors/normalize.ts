import { VendorProduct } from "./types";

export function normalizeVendorProduct(
  vendorId: string,
  raw: Record<string, unknown>
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
