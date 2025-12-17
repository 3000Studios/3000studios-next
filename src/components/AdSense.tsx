import Script from "next/script";

type AdSenseUnitProps = {
  slot: string;
  client?: string;
  style?: React.CSSProperties;
  className?: string;
  format?: string;
  responsive?: string;
};

export const AdSenseUnit = ({
  slot,
  client = "ca-pub-5800977493749262", // Default client ID based on usage
  style,
  className,
  format = "auto",
  responsive = "true",
}: AdSenseUnitProps) => {
  return (
    <div className={`ads-container ${className || ""}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <Script id={`adsense-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
};
