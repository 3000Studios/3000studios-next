import { vendorAdapters } from "./adapters";
import { normalizeVendorProduct } from "./normalize";
import { VENDORS } from "./registry";

function validateFeedUrl(override: string, vendorEntry: { feedUrlEnv?: string } | undefined, vendorId: string): string {
  let url: URL;
  try {
    url = new URL(override);
  } catch {
    throw new Error(`Invalid feed URL override for vendor ${vendorId}`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Unsupported feed URL protocol for vendor ${vendorId}`);
  }

  const envKey = vendorEntry?.feedUrlEnv || "VENDOR_FEED_URL";
  const envValue = process.env[envKey];

  if (envValue) {
    try {
      const configuredUrl = new URL(envValue);
      if (configuredUrl.hostname !== url.hostname) {
        throw new Error(`Feed URL override host not allowed for vendor ${vendorId}`);
      }
    } catch {
      // If the configured env value is not a valid URL, fall back to basic protocol validation only
    }
  }

  return override;
}

function getFeedUrl(vendorId: string, override?: string) {
  const vendorEntry = Object.values(VENDORS).find((v) => v.id === vendorId);
  if (override) {
    return validateFeedUrl(override, vendorEntry, vendorId);
  }
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
