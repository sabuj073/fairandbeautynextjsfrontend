import React from "react";
import { getHomeBanner } from "@/lib/apiData";
import BannerItem from "./BannerItem";

type Props = {
  position?: number;
};

export default async function BannerNew({ position = 1 }: Props) {
  const banners = await getHomeBanner(position);

  if (!banners?.data?.length) {
    return null;
  }

  return (
    <>
    <div className="container home-section mx-auto">
      <div className="offer flex flex-col gap-6">
        <div className="offer_item grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {banners.data.map((item: any) => (
            <BannerItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

// import ProductSlider from "@/app/ui/Product/ProductSlider";
// import { getOffer } from "@/lib/apiData";

// export default async function Offer() {
//   const result = await getOffer();
//   const brands = result.data as any;

//   return (
//     <ProductSlider
//       products={brands}
//       view_link="flash-deal"
//       translateKey={"special_offers"}
//       slide_button={false}
//     />
//   );
// }
