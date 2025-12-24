import { vendorAdapters } from "./adapters";
import { normalizeVendorProduct } from "./normalize";
import { VENDORS } from "./registry";

function getFeedUrl(vendorId: string, override?: string) {
  if (override) return override;
  const vendorEntry = Object.values(VENDORS).find((v) => v.id === vendorId);
  const envKey = vendorEntry?.feedUrlEnv || "VENDOR_FEED_URL";
  const envValue = process.env[envKey];
  if (!envValue) {
    throw new Error(`Feed URL missing for vendor ${vendorId}; set ${envKey}`);
  }
  return envValue;
}

export async function ingestVendorFeed(
  vendorId: string,
  feedUrl?: string
) {
  const resolvedFeedUrl = getFeedUrl(vendorId, feedUrl);
  const adapter = vendorAdapters[vendorId];

  if (adapter) {
    return adapter.fetchProducts(resolvedFeedUrl);
  }

  // Fallback: assume generic JSON with items
  const res = await fetch(resolvedFeedUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch feed ${resolvedFeedUrl}`);
  const data = await res.json();
  const items = Array.isArray(data?.items) ? data.items : data?.products || [];
  return items.map((item: any) => normalizeVendorProduct(vendorId, item));
}
