import React, { Suspense } from "react";
import Container from "../Container/Container";
import TranslateHeading from "../TranslateHeading";
import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import { CollectionSkelton } from "../skeletons";
import Link from "next/link";
import FlashDealItem from "./FlashDealItem"; // ✅ new
import CustomTranslateHeading from "../CustomTranslateHeading";

async function getFlashCollection(): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/flash-deals-recommendation`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data: any = await response.json();
  return data.data as any;
}

export default async function FlashDeal() {
  const collection = await getFlashCollection();
  return (
    <section className="pb-[18px] md:pb-[70px]">
      <Container>
        <div className="flex flex-col gap-6">
          <CustomTranslateHeading title={'FAIR AND BEAUTY RECOMMENDATION'} translateKey={"authentic_recommendation"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Suspense fallback={<CollectionSkelton />}>
              {collection.map((item: any) => (
                <FlashDealItem key={item.id} item={item} />
              ))}
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}

// import ProductSlider from "@/app/ui/Product/ProductSlider";
// import { API_BASE_URL } from "@/app/config/api";

// async function getFlashCollection(): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/flash-deals-recommendation`, {
//     cache: "no-store",
//   });
//   if (!response.ok) {
//     return [];
//   }
//   const data: any = await response.json();
//   return data.data as any;
// }

// export default async function FlashDeal() {
//   const collection = await getFlashCollection();

//   return (
//     <ProductSlider
//       products={collection}
//       view_link="recommendation"
//       translateKey="authentic_recommendation"
//       slide_button={false}
//     />
//   );
// }
