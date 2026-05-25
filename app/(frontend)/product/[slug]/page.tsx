import { API_BASE_URL, BASE_URL } from "@/app/config/api";
import { ApiResponse, ProductDetails } from "@/types/api";
import Breadcrumb from "@/app/ui/Breadcrumb/Breadcrumb";
import Container from "@/app/ui/Container/Container";
import RatingSection from "@/app/ui/Product/DeteilsPage/CustomerReview/RatingSection";
import Description from "@/app/ui/Product/DeteilsPage/Description";
import GalleryImage from "@/app/ui/Product/DeteilsPage/GalleryImage/GalleryImage";
import SocialLink from "@/app/ui/Product/DeteilsPage/SocialLink";
import Summary from "@/app/ui/Product/DeteilsPage/Summary";
import ProductDetailsTable from "@/app/ui/Product/DeteilsPage/ProductDetailsTable";
import Frequently from "@/app/ui/Product/Frequently";
import RecentlyProduct from "@/app/ui/Product/RecentlyProduct";
import SimilarProduct from "@/app/ui/Product/SimilarProduct";
import StarRating from "@/app/ui/StarRating/StarRating";

import type { Metadata, NextPage } from "next";
import Link from "next/link";
import AddToCartAction from "@/app/ui/Product/AddToCartAction/AddToCartAction";
import ProductOptions from "@/app/ui/Product/ProductOptions";
import Price from "@/app/ui/Product/Price/Price";
import Stock from "@/app/ui/Product/Stock/Stock";
import AddWishlist from "@/app/ui/Product/WishAdd/AddWishlist";
import BuyNow from "@/app/ui/Product/AddToCartAction/BuyNow";
import DataLayerViewItem from "@/components/ui/DataLayerViewItem";
import {
  CartIconPD,
  DownloadIconPD,
  MessageIconPD,
  PhoneIconPD,
  ProgressBarIcon,
  ShareIcon,
  WishlistIcon,
} from "@/app/ui/Icons/Icons";
import FrequentlyDetails from "@/app/ui/Product/DeteilsPage/FrequentlyDetails";
import ProductDescriptions from "@/app/ui/Product/DeteilsPage/ProductDescriptions";
import ReviewDetails from "@/app/ui/Product/DeteilsPage/ReviewDetails";
import CouponDetails from "@/app/ui/Product/DeteilsPage/CouponDetails";
import WishAdd from "@/app/ui/Product/WishAdd/WishAdd";
import SkinAnalyzerEntryCard from "@/app/ui/SkinAnalyzer/SkinAnalyzerEntryCard";
import RatingPill from "@/app/ui/Product/RatingPill";
import TopValueCombos from "@/app/ui/TopValueCombos/TopValueCombos";

const options = {
  loop: true,
  speed: 10,
};

const getNumericValue = (value: any) => {
  return parseFloat(String(value ?? "").replace(/[^0-9.-]+/g, "")) || 0;
};

const formatTaka = (value: any) => {
  const numericValue = getNumericValue(value);

  if (numericValue <= 0) {
    return "";
  }

  return `৳ ${numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

interface PageProps {
  params: {
    slug: string;
  };
}
async function getProductDetails(slug: string): Promise<ProductDetails[]> {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    // throw new Error('Failed to fetch product details');
    return [];
  }
  const data: ApiResponse = await response.json();

  return data.data as any;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const product = await getProductDetails(params.slug);
  const productDetails = product[0];
  return {
    title: productDetails?.meta_title,
    description: productDetails?.meta_description,
    openGraph: {
      title: productDetails?.meta_title,
      description: productDetails?.meta_description,
      images: [
        {
          url: `${BASE_URL}/public/${productDetails?.meta_img}`,
          width: 800,
          height: 600,
          alt: `${productDetails?.meta_title} image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productDetails?.meta_title,
      description: productDetails?.meta_description,
      images: [`${BASE_URL}/public/${productDetails?.meta_img}`],
    },
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { slug } = params;
  const product = (await getProductDetails(slug)) as any;

  if (!product || product.length === 0) {
    return <p>No product details found.</p>;
  }
  const productDetails = product[0];
  const savePrice = getNumericValue(productDetails.save_price);
  const discount = getNumericValue(productDetails.discount);
  const currentStock = getNumericValue(productDetails.current_stock);
  // await RecentView(productDetails.id || null)

  return (
    <section className="product_details md:max-w-[85%] xxl:max-w-[1500px] md:mx-auto mx-4">
      <Container>
        {/* Push dataLayer event */}
        <DataLayerViewItem product={productDetails} />

        {/* <Breadcrumb
          link={`/product/${productDetails?.slug}`}
          name={productDetails?.name}
        /> */}
        <div className="product_content_area">
          <div className="product_content flex flex-col xl:grid grid-cols-2 gap-4 lg:gap-2">
            <div className="md:sticky md:top-40 md:self-start">
              <div className="image_area mt-2 col-span-1 aspect-[0] xl:aspect-[1.2/1]  ">
              <div className="flex gap-2 items-center mb-3 flex-wrap">
                {productDetails.free_shipping === 1 && (
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #063B00 0%, #10A100 100%)",
                      maxWidth: "200px",
                    }}
                    className="flex flex-row gap-1 rounded-r-sm px-2 py-0.5 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      width="16"
                      height="16"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="white"
                      viewBox="0 0 512 289.28"
                    >
                      <path d="M429.38 196.01c-25.83 0-46.64 20.95-46.64 46.63 0 25.83 20.95 46.64 46.64 46.64 25.83 0 46.63-20.95 46.63-46.64 0-25.82-20.95-46.63-46.63-46.63zm-382.92-26.2v-37.57h15.66c6.3 0 10.63 1.44 12.98 4.33 2.35 2.88 3.53 7.7 3.53 14.46 0 6.75-1.18 11.57-3.53 14.45-2.35 2.89-6.68 4.33-12.98 4.33H46.46zm15.83-27.95h-4.64v18.33h4.64c1.53 0 2.64-.19 3.33-.57.69-.38 1.04-1.25 1.04-2.61v-11.97c0-1.36-.35-2.23-1.04-2.61-.69-.38-1.8-.57-3.33-.57zm43.47 13.76H94.57v4.57h13.7v9.62H83.38v-37.57h24.61l-1.4 9.62H94.57v5.05h11.19v8.71zm30.48 14.19h-22.37v-37.57h11.18v27.95h11.19v9.62zm3.92 0v-37.57h11.18v37.57h-11.18zm36.69-37.57h11.8l-8.67 37.57h-16.33l-8.67-37.57h11.8l4.76 23.86h.5l4.81-23.86zm37.82 23.38h-11.19v4.57h13.7v9.62h-24.89v-37.57h24.61l-1.4 9.62h-12.02v5.05h11.19v8.71zm38.59 14.19h-12.31l-4.58-11.18h-2.41v11.18h-11.18v-37.57h17.62c8.01 0 12.02 4.39 12.02 13.17 0 6.01-1.73 9.97-5.2 11.9l6.04 12.5zm-19.3-27.95v7.51h2.58c1.34 0 2.32-.15 2.93-.45.62-.3.93-.99.93-2.07v-2.47c0-1.08-.31-1.77-.93-2.07-.61-.3-1.59-.45-2.93-.45h-2.58zm33.62-9.62l3.08 13.23h.39l3.13-13.23h12.37l-10.08 27.35v10.22h-11.18v-10.22l-10.07-27.35h12.36zM101.82 88.72H85.16v22.73h-19.6V50.2h40.18l-2.45 15.68H85.16v8.23h16.66v14.61zm63.21 22.73h-21.56l-8.04-18.23h-4.21v18.23h-19.6V50.2h30.87c14.04 0 21.07 7.16 21.07 21.46 0 9.8-3.04 16.27-9.12 19.41l10.59 20.38zm-33.81-45.57v12.25h4.5c2.36 0 4.07-.24 5.15-.73s1.62-1.62 1.62-3.38V70c0-1.77-.54-2.9-1.62-3.38-1.08-.49-2.79-.74-5.15-.74h-4.5zm79.87 22.44h-19.6v7.45h24.01v15.68h-43.61V50.2h43.12l-2.45 15.68h-21.07v8.23h19.6v14.21zm51.94 0h-19.6v7.45h24.01v15.68h-43.61V50.2h43.12l-2.45 15.68h-21.07v8.23h19.6v14.21zm136.5-15.43l-70.02-.42v-42.7c0-8.97-.6-15.44-7.46-22.31C317.46 2.87 311.14 0 304.11 0H25.25C18.22 0 11.91 2.87 7.32 7.46-.19 14.97 0 21.18 0 30.15v198.72c0 6.89 2.87 13.49 7.46 18.22 4.59 4.74 10.91 7.75 17.94 7.75h94.26c3.88 0 6.89-3.16 6.89-6.89 0-3.87-3.16-6.88-6.89-6.88l-94.26.14c-3.16 0-5.88-1.44-8.04-3.59-2.15-2.29-3.58-5.45-3.58-8.75V23.58c.39-2.47 1.56-4.74 3.3-6.36 2.15-2.15 5.02-3.44 8.17-3.44h278.86c3.16 0 6.03 1.29 8.18 3.44 4.05 4.06 3.44 8.14 3.44 13.28v210.57h-54.3c-3.87 0-6.89 3.01-6.89 6.88 0 3.73 3.02 6.89 6.89 6.89h61.19c3.87 0 6.89-3.01 6.89-6.89v-7.89h41.61c3.16-71.74 106.04-81.64 116.51 0h22.68c2.99-15.9 1.87-34.53-2.27-54.98-4.84-23.9-3.42-19.26-25.73-27.81l-45.51-20.38-37.27-64zm-17.94 19.66l-34.72-.43v44.77h58.26l-23.54-44.34zm-191.9 103.46c-25.83 0-46.64 20.95-46.64 46.63 0 25.83 20.95 46.64 46.64 46.64 25.83 0 46.63-20.95 46.63-46.64 0-25.82-20.95-46.63-46.63-46.63zm0 28.7c-9.9 0-17.94 8.03-17.94 17.93 0 9.91 8.04 17.94 17.94 17.94 9.9 0 17.93-8.03 17.93-17.94 0-9.9-8.03-17.93-17.93-17.93zm239.69 0c-9.9 0-17.94 8.03-17.94 17.93 0 9.91 8.04 17.94 17.94 17.94 9.9 0 17.93-8.03 17.93-17.94 0-9.9-8.03-17.93-17.93-17.93z" />
                    </svg>
                    <p className="sm:text-[14px] text-[7px] font-semibold uppercase text-white">
                      FREE SHIPPING
                    </p>
                  </div>
                )}

                {productDetails.best_seller === 1 && (
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #FD1B57 0%, #BA133F 100%)",
                    }}
                    className="flex flex-row gap-1 rounded-r-sm px-2 py-0.5 items-center"
                  >
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      width="16"
                      height="16"
                      viewBox="0 0 92.35 122.88"
                    >
                      <defs>
                        <style></style>
                      </defs>
                      <title>best-quality</title>
                      <path
                        className="cls-1"
                        d="M3.39,113.07,15,111l5.73,10.25c4.15,5.15,6.79-3.31,8-6.26L39.78,94c-2.57-.89-5.66-3.47-8.85-6.35-6.35.13-12.26-1-16.62-6.52L1.5,105.85.38,108.23c-.87,3.08-.41,5.12,3,4.84ZM46.77,27l3.79,8.88,9.62.86a.78.78,0,0,1,.7.83.81.81,0,0,1-.26.52h0l-7.27,6.35,2.15,9.41a.78.78,0,0,1-1.18.82L46.06,49.7l-8.29,4.95a.77.77,0,0,1-1.05-.26.73.73,0,0,1-.09-.57h0l2.15-9.41-7.27-6.35A.77.77,0,0,1,31.43,37a.79.79,0,0,1,.54-.26l9.59-.86L45.35,27a.77.77,0,0,1,1-.41.72.72,0,0,1,.41.41ZM46.18,0a9.26,9.26,0,0,1,5.61,1.76C54,3.16,56.45,5.91,59.5,7.65c4.28,2.45,12.22-.93,16.29,5.11,2.37,3.52,2.48,6.28,2.66,9a15.84,15.84,0,0,0,3.72,9.64c5,6.59,6,11,3.45,15.56-1.75,3.11-5.44,4.85-6.29,6.82-1.82,4.2.19,7.37-2.3,12.27a13.05,13.05,0,0,1-7.93,6.78c-3,1-6-.43-8.39.58C56.5,75.19,53.39,79.3,50,80.34a13,13,0,0,1-7.73,0c-3.35-1-6.46-5.15-10.66-6.92-2.4-1-5.4.39-8.39-.58a13,13,0,0,1-7.94-6.78C12.83,61.16,14.84,58,13,53.79c-.86-2-4.55-3.71-6.3-6.82-2.57-4.58-1.53-9,3.46-15.56,3-4,3.53-6.7,3.72-9.64.17-2.73.28-5.49,2.65-9,4.07-6,12-2.66,16.3-5.11,3-1.74,5.51-4.49,7.71-5.88A9.24,9.24,0,0,1,46.18,0Zm-.12,16.93A24.15,24.15,0,1,1,21.91,41.09,24.15,24.15,0,0,1,46.06,16.94ZM89,113.07,77.41,111l-5.73,10.25c-4.16,5.15-6.8-3.31-8-6.26L52.57,94c2.57-.89,5.67-3.47,8.85-6.35,6.35.13,12.27-1,16.62-6.52l12.82,24.76L92,108.23c.87,3.08.41,5.12-3,4.84Z"
                      />
                    </svg>
                    <p className="sm:text-[14px] text-[7px] font-semibold uppercase text-white">
                      BEST SELLING
                    </p>
                  </div>
                )}

              </div>
              <GalleryImage
                images={productDetails.photos}
                options={options}
                id={productDetails.id}
                rating={productDetails.rating}
                ratingCount={productDetails.rating_count}
                topRated={productDetails.top_rated}
                topRatedLabel={productDetails.top_rated_label}
                topRatedBgColor={productDetails.top_rated_bg_color}
                topRatedTextColor={productDetails.top_rated_text_color}
              />
            </div>
            </div>
            <div className="product_info flex flex-col md:mt-12 mt-0 gap-1 md:gap-2 ">
              <div>
                <h2 className="title text-neutral-black font-semibold md:text-4xl text-2xl ">
                  {productDetails.name}
                </h2>
              </div>
              {productDetails.customer_viewing_count && productDetails.customer_viewing_count > 0 && (
                <div className="flex gap-1 justify-start items-center">
                  <PhoneIconPD />
                  <span
                    style={{
                      color: "rgba(255, 59, 48, 1)",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {productDetails.customer_viewing_count} {productDetails.customer_viewing_count_text || "Customers Are Viewing This Product"}
                  </span>
                </div>
              )}
              {((productDetails.items_added_to_cart && productDetails.items_added_to_cart > 0) || productDetails.items_added_to_cart_text) && (
                <div className="flex gap-1 justify-start items-center">
                  <CartIconPD />
                  <span
                    style={{
                      color: "rgba(255, 59, 48, 1)",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {productDetails.items_added_to_cart && productDetails.items_added_to_cart > 0 
                      ? `${productDetails.items_added_to_cart}${productDetails.items_added_to_cart_text ? ` ${productDetails.items_added_to_cart_text}` : ' Added To Cart'}`
                      : productDetails.items_added_to_cart_text || 'Added To Cart'
                    }
                  </span>
                </div>
              )}
              {((productDetails.items_sold && productDetails.items_sold > 0) || productDetails.items_sold_text) && (
                <div>
                  <span style={{ fontWeight: "700", fontSize: "14px" }}>
                    {productDetails.items_sold && productDetails.items_sold > 0 
                      ? `Total Sold : ${productDetails.items_sold}${productDetails.items_sold_text ? ` ${productDetails.items_sold_text}` : ' pc'}`
                      : productDetails.items_sold_text || 'Total Sold'
                    }
                  </span>
                </div>
              )}
              <div className="review flex items-center justify-start">
                <RatingPill
                  rating={productDetails.rating}
                  reviewCount={productDetails.rating_count}
                  showLabel={productDetails.top_rated === 1}
                  label={productDetails.top_rated_label || "Top Rated"}
                  labelBgColor={productDetails.top_rated_bg_color}
                  labelTextColor={productDetails.top_rated_text_color}
                />
              </div>
              <div className="flex justify-start items-center gap-1 text-[14px]">
                <h4 className="brand_name text-neutral-black text-base  ">
                  Brand:
                </h4>
                <span style={{ fontWeight: "700" }}>
                  {productDetails.brand.name}
                </span>
              </div>
              <div>
                <button
                  className="flex gap-1 justify-center items-center px-3 py-2 rounded-md"
                  style={{
                    background:
                      " linear-gradient(90deg, #A81465 0%, #FD1B57 100%)",
                    color: "white",
                  }}
                >
                  Download app For <span className="underline">Android</span>{" "}
                  <DownloadIconPD />
                </button>
              </div>
              <div className="flex justify-start items-center gap-4">
                {/* <button
                  className="flex gap-1 justify-center items-center px-3 py-2 rounded-md"
                  style={{ backgroundColor: " black", color: "white" }}
                >
                  Message
                  <MessageIconPD />
                </button> */}
                <div className="mb-2">
                  <SocialLink slug={productDetails.slug} />
                </div>
              </div>
              <SkinAnalyzerEntryCard compact className="mb-4" />
              {productDetails.deal_claimed_percentage && productDetails.deal_claimed_percentage > 0 && (
                <div>
                  <ProgressBarIcon />
                  <span style={{ fontSize: "10px", fontWeight: "400px" }}>
                    Deal is {productDetails.deal_claimed_percentage}% claimed
                  </span>
                </div>
              )}
              <div>
                <div className="price_area flex items-center gap-2 justify-between pb-4 border-neutral-black ">
                  <div className="price flex flex-nowrap items-center gap-2 whitespace-nowrap">
                    <Price productDetails={productDetails} />
                    {savePrice > 0 && (
                      <>
                    <span>|</span>
                    <p
                      style={{
                        color: "#10A100",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                     Save {formatTaka(savePrice)}
                    </p>
                      </>
                    )}
                    {/* {productDetails.has_discount && (
                    <div className="offer max-w-max text-primary text-[12px] sm:text-[12px] ">
                      <span>
                        {productDetails.discount}
                        {productDetails?.discount_off_text}{" "}
                      </span>
                    </div>
                  )} */}
                  </div>
                </div>
                <div className="flex justify-start items-center gap-3">
                  {discount > 0 && (
                  <div
                    className="text-white mr-7 flex justify-center items-center rounded-bl-3xl rounded-se-3xl"
                    style={{
                      background:
                        "linear-gradient(180deg, #139804 0%, #063B00 100%)",
                    }}
                  >
                    <span className="px-6 py-1 text-xs font-normal">
                     {productDetails.discount}  {productDetails.discount_off_text}
                   
                    </span>
                  </div>
                  )}
                  <div className="cursor-pointer">
                    <WishAdd id={productDetails.id} />
                    {/* <WishlistIcon /> */}
                  </div>
                  {/* Quantity  */}
                  <AddToCartAction {...productDetails} />
                  {currentStock > 0 && (
                    <span style={{ fontSize: "10px", fontWeight: "400" }}>
                      ({currentStock} In Stock)
                    </span>
                  )}
                </div>
              </div>
              {/* stock  */}
              <ProductOptions
                id={productDetails?.id}
                choice_options={productDetails.choice_options}
                colors={productDetails.colors}
                stocks={productDetails.stocks}
              />
              {/* <Stock productDetails={productDetails} /> */}
              {productDetails.short_description && (
                <div>
                  <h1 className="text-xl font-semibold">HIGHLIGHTES</h1>
                  <hr className="bg-slate-400 h-[2px]" />
                  <div
                    style={{ backgroundColor: "#F9F9F9" }}
                    className="p-3 rounded-md text-gray-600 text-sm md:text-lg"
                    dangerouslySetInnerHTML={{ __html: productDetails.short_description }}
                  />
                </div>
              )}
              <div>
                <Summary {...productDetails} />
              </div>
              <div>
                <ProductDetailsTable productDetails={productDetails} />
              </div>
              <div>
                <CouponDetails productId={productDetails.id} />
              </div>
              <div>
                <FrequentlyDetails 
                  productSlug={productDetails.slug} 
                  productId={productDetails.id}
                  title={productDetails.frequently_bought_title}
                  frequentlyBoughtTogether={productDetails.frequently_bought_together}
                />
              </div>
              <div>
                <ProductDescriptions productDetails={productDetails} />
              </div>
              <div>
                <ReviewDetails productId={productDetails.id} productRating={productDetails.rating} ratingCount={productDetails.rating_count} />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div>
        <TopValueCombos />
      </div>
      {/* SimilarProduct product  */}
      <div>
        <SimilarProduct id={productDetails.id} />
      </div>
      {/* Recently product  */}
      <div className="md:mt-0 -mt-[40px]">
        <RecentlyProduct id={productDetails.id} />
      </div>
    </section>
  );
};
export default Page;
