'use client';

import { useEffect } from 'react';

/**
 * Manual AdSense ad unit. Use only if you have a specific data-ad-slot.
 * If you don't have a slot, rely on Auto Ads via the script injected in layout.tsx
 */
export function AdSenseUnit({ slot, style }: { slot: string; style?: React.CSSProperties }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore
    }
  }, []);

  // Only render if AdSense ID is configured
  if (typeof window === 'undefined') return null;

  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return null;

  const client = raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
