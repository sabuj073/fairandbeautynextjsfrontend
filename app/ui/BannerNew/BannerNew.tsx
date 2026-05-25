import React from "react";
import { API_BASE_URL } from "@/app/config/api";
import BannerItem from "./BannerItem";

type Props = {
  position?: number;
  fullWidth?: boolean;
};

async function getBanner(position: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/home-banners/${position}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch home banner ${position}:`, response.status);
      return { data: [] };
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch home banner ${position}:`, error);
    return { data: [] };
  }
}

export default async function BannerNew({ position = 1, fullWidth = false }: Props) {
  const banners = await getBanner(position);

  if (!banners?.data?.length) {
    return null;
  }

  return (
    <>
    <div className="container home-section mx-auto">
      <div className="offer flex flex-col gap-6">
        <div className={fullWidth ? "offer_item grid grid-cols-1 gap-4" : "offer_item grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4"}>
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
