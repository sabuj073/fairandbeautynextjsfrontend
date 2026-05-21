import '@/app/ui/global.css';
import Footer from "@/app/ui/Footer/Footer";
import Header from "@/app/ui/Header/Header";
import Providers from '@/lib/Providers';
import { API_BASE_URL, BASE_URL } from './config/api';
import { Metadata } from 'next';
import { get_setting } from '@/lib/utils';
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import GTM from '@/components/ui/GTM';
import GTMHead from '@/components/ui/GTMHead';
import Script from 'next/script';
import SnowEffect from '@/app/ui/SnowEffect/SnowEffect';

// ✅ 1️⃣ Get site details
async function getDetails() {
  try {
    const response = await fetch(`${API_BASE_URL}/business-settings`, {
      next: { revalidate: 10 }
    });

    if (!response.ok) {
      return [];
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data: any = await response.json();
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

// ✅ 2️⃣ Get translations
async function getTranslate(lang: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/get_translation?lang=${lang}`);
    if (!response.ok) {
      return {};
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data: any = await response.json();
      return data.data;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

// ✅ 3️⃣ Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const result = await getDetails();

  const meta_title = get_setting(result, 'meta_title')?.value || "";
  const meta_description = get_setting(result, 'meta_description')?.value || "";
  const meta_image = get_setting(result, 'meta_image')?.value || "";

  return {
    title: meta_title,
    description: meta_description,
    openGraph: {
      title: meta_title,
      description: meta_description,
      images: [
        {
          url: `${BASE_URL}/public/${meta_image}`,
          width: 300,
          height: 250,
          alt: `${meta_title} image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta_title,
      description: meta_description,
      images: [`${BASE_URL}/public/${meta_image}`],
    },
  };
}

// ✅ 4️⃣ Get languages
async function getLanguages(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/languages`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

// ✅ 5️⃣ RootLayout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth() as any;
  const lang = cookies().get('lang')?.value || 'en';

  const setting = await getDetails();
  const translate = await getTranslate(lang);
  const languages = await getLanguages();
  const site_icon = get_setting(setting, 'site_icon')?.value || "";

  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="icon" href={`${BASE_URL}/public/${site_icon}`} />

        <script
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

      </head>
      <body id="filter_product" className="overflow-x-hidden max-w-full">
        {/* ✅ GTM NoScript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MR8RNKC5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* ✅ Loading overlay */}
        <LoadingOverlay />

        {/* ✅ Snow Effect */}
        <SnowEffect />

        {/* ✅ App Providers */}
        <Providers setting={setting} translate={translate}>
          <div className="overflow-x-hidden max-w-full w-full">
            <Header translate={translate} languages={languages} setting={setting} />
            {children}
            <Footer setting={setting} translate={translate} />
          </div>
        </Providers>
      </body>
    </html>
  );
}

