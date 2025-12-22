"use client";
import { useEffect } from "react";

export default function MarketTicker() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "NASDAQ:TSLA", title: "Tesla" },
        { proName: "NASDAQ:NVDA", title: "NVIDIA" },
        { proName: "FX:EURUSD", title: "EUR/USD" }
      ],
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en"
    });

    document.getElementById("ticker")?.appendChild(script);
  }, []);

  return (
    <div
      id="ticker"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "360px",
        zIndex: 9999
      }}
    />
  );
}
