
import BannerSlider from "@/app/ui/Banner/Slider";
import { getSliders } from "@/lib/apiData";
export default async function BannerSliderWrapper() {
  const banners = await getSliders();
  return <BannerSlider banners={banners} />;
}