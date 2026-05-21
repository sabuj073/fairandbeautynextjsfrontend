import { API_BASE_URL } from "@/app/config/api";
import { NextResponse } from "next/server";

async function fetchJson(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";

  try {
    const [nativePageData, menuData, recentData, bannersData, offersData, brandsData] =
      await Promise.all([
        fetchJson(`/search/page-data?lang=${encodeURIComponent(lang)}`).catch(
          () => null
        ),
        fetchJson(`/categories/menu?lang=${encodeURIComponent(lang)}`).catch(
          () => null
        ),
        fetchJson("/get-search-suggestions?query_key=").catch(() => null),
        fetchJson("/banners").catch(() => null),
        fetchJson("/offers").catch(() => null),
        fetchJson("/brands/top").catch(() => null),
      ]);

    if (nativePageData?.success && nativePageData?.data) {
      return NextResponse.json(nativePageData.data, { status: 200 });
    }

    const fallbackBanners = [
      ...(Array.isArray(bannersData?.data) ? bannersData.data : []),
      ...(Array.isArray(offersData?.data) ? offersData.data : []),
    ];

    return NextResponse.json(
      {
        menu: Array.isArray(menuData?.menu) ? menuData.menu : [],
        recent_searches: Array.isArray(recentData) ? recentData : [],
        banners: fallbackBanners,
        promo_banners: fallbackBanners,
        brands: Array.isArray(brandsData?.data) ? brandsData.data : [],
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        menu: [],
        recent_searches: [],
        banners: [],
        brands: [],
        message: error?.message || "Unable to load search page data.",
      },
      { status: 200 }
    );
  }
}
