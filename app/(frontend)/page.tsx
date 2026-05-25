
import ArriVal from "@/app/ui/Arrival/Arrival";
import Offer from "@/app/ui/Offer/Offer";
import Trending from "@/app/ui/Trending/Trending";
import ConcernMain from "../ui/ConcernMain/ConcernMain";
import Concern from "@/app/ui/Concern/Concern";
import CustomerReview from "@/app/ui/CustomerReview/CustomerReview";
import ResonShop from "@/app/ui/ResonShop/ResonShop";
import Ingredients from "@/app/ui/Ingredients/Ingredients";
import Brand from "@/app/ui/Brand/Brand";
import BannerSliderWrapper from "@/app/ui/Banner/BannerSliderWrapper";
import CategoryWrapper from "@/app/ui/Category/CategoryWrapper";
import ShopByLook from "@/app/ui/ShopByLook/ShopByLook";
import FlashDeal from "@/app/ui/FlashDeal/FlashDeal";
import CategoryMobile from "../ui/CategoryMobile/CategoryMobile";
// import { cookies } from "next/headers";
// import { fetchData } from "@/lib/dataFetching";
import { API_BASE_URL } from "../config/api";
import TopHeader from "../ui/Header/TopHeader";
import HomepageScript from "./scripts/HomepageScript";
import { getMenu } from "./scripts/getMenu";
import BannerNew from "../ui/BannerNew/BannerNew";
import Featured from "../ui/Featured/Featured";
import PreOrder from "../ui/PreOrder/PreOrder";
import BestSelling from "../ui/BestSelling/BestSelling";
import Serums from "../ui/Serums/Serums";
import SkinAnalyzerEntryCard from "../ui/SkinAnalyzer/SkinAnalyzerEntryCard";
import HomeProductPills from "../ui/HomeProductPills/HomeProductPills";
import LastView from "../ui/LastViewed/LastView";

// export async function getMenu(): Promise<any> {
//   const lang = cookies().get('lang')?.value || 'en';
//   const response = await fetchData<any>(`${API_BASE_URL}/categories/menu?lang=${lang}`, { revalidate: 10 });
//   return response as any;
// }

type HomePageSections = Record<string, boolean>;

async function getHomePageSections(): Promise<HomePageSections> {
  try {
    const response = await fetch(`${API_BASE_URL}/homepage-sections`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return {};
    }

    const payload = await response.json();
    return payload?.data ?? {};
  } catch (error) {
    console.error("Failed to fetch homepage section visibility:", error);
    return {};
  }
}

export default async function Page() {
  const [menus, sections] = await Promise.all([
    getMenu(),
    getHomePageSections(),
  ]);
  const show = (key: string) => sections[key] !== false;

  return (
    <main className="md:max-w-[85%] xxl:max-w-[1500px] w-full mx-auto overflow-x-hidden max-w-full">

      {show("banner_slider") && <BannerSliderWrapper />}
      {show("mobile_categories") && (
        <CategoryMobile menus={menus?.menu} />
      )}
      {show("top_header") && <TopHeader />}
      {show("category_wrapper") && <CategoryWrapper />}
      {show("offer") && <Offer />}
      <BannerNew position={4} fullWidth />
      {show("reason_shop") && <ResonShop />}
      {show("skin_analyzer") && (
        <SkinAnalyzerEntryCard className="home-section" />
      )}
      {show("flash_deal") && <FlashDeal styleOverride="style_2" />}
      <ConcernMain />
      {show("home_product_pills") && <HomeProductPills />}
      {show("ingredients") && <Ingredients />}
      <BannerNew position={5} fullWidth />
      {show("flash_deal") && <FlashDeal styleOverride="style_1" />}
      {show("best_selling") && <BestSelling />}
      {show("top_value_combos") && <Concern fallbackTitle="SHOP BY COMBO" />}
      {show("banner_new_6") && <BannerNew position={6} fullWidth />}
      {show("trending") && <Trending />}
      {show("featured") && <Featured />}
      {show("banner_new_1") && <BannerNew position={1} />}
      {show("arrival") && <ArriVal />}
      {show("pre_order") && <PreOrder />}
      {show("banner_new_2") && <BannerNew position={2} />}
      {show("brand") && <Brand styleOverride="design_1" />}
      {show("brand") && <Brand styleOverride="design_2" />}
      {show("brand") && <Brand styleOverride="design_3" />}
      {show("brand") && <Brand styleOverride="design_4" />}
      {show("brand") && <Brand styleOverride="design_5" />}
      {show("serums") && <Serums />}
      {show("shop_by_look") && <ShopByLook />}
      {show("flash_deal") && <FlashDeal styleOverride="old_style" />}
      {show("customer_review") && <CustomerReview />}
      {show("last_view") && <LastView />}
      {/* Blog section removed - link still works at /blog */}

    {/* <div className="hidden md:block">

      <FooterSeo />
    </div> */}

    {/* <Script
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
    /> */}
     <HomepageScript />

    </main>
  );
}
