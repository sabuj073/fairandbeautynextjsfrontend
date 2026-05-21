'use client';

import Script from 'next/script';

export default function GTM() {
  return (
    <>
      {/* GTM Head Script */}
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MR8RNKC5');
          `,
        }}
      />
      {/* GTM NoScript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MR8RNKC5"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  );
}
