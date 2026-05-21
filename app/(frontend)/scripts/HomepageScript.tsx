"use client";

import Script from "next/script";

export default function HomepageScript() {
  return (
    <Script
      id="homepage-data-layer"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'page_view',
            page_type: 'home',
            timestamp: new Date().toISOString()
          });
        `,
      }}
    />
  );
}
