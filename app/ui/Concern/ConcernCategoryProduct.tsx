"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductItem from "@/app/ui/Product/ProductItem";
import { CategoryFeatured } from "@/types/api";
import { Button } from "../button";
import { useRef } from "react";
import { useState, useEffect, Suspense } from "react";
import { getProductByCategory } from "@/lib/apiData";
import {
  CategorySkeleton,
  ImageSkeleton,
  ProductSkeleton,
} from "@/app/ui/skeletons";
import CustomImage from "../CustomImage/CustomImage";
import { cookieStore } from "@/lib/hooks/useCookieStore";
import ProductViewAll from "../Product/ProductViewAll";

interface ConcernCategoryProps {
  category: CategoryFeatured[];
}

export default function ConcernCategoryProduct({
  category,
}: ConcernCategoryProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [singleProduct, setSingleProduct] = useState<any>({});
  const [categoryData, setCategoryData] = useState<CategoryFeatured | null>();
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<number>(4); // Number of products to show initially

  const { heading_title_value } = cookieStore();
  const concern_banner = heading_title_value?.concern_banner;

  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectCategory = async (categoryId: number) => {
    setLoading(true);
    const fetchedProducts = await getProductByCategory(categoryId);
    setProducts(fetchedProducts);
    setSingleProduct(fetchedProducts[0]);
    setLoading(false);
  };

  useEffect(() => {
    if (category && category?.length > 0) {
      handleSelectCategory(category[0].id);
      setCategoryData(category[0]);
    }
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  // Function to get products to display (with lazy loading)
  const getProductsToDisplay = () => {
    if (loading) {
      return [];
    }
    
    // Always show at least the first few products
    return products.slice(0, Math.max(visibleProducts, 4));
  };

  // Load more products when user interacts with carousel
  const handleCarouselInteraction = () => {
    // Increase the number of visible products when user interacts
    if (visibleProducts < products.length) {
      setVisibleProducts(prev => Math.min(prev + 4, products.length));
    }
  };

  return (
    <>
      <div className="concern_banner">
        <div
          ref={bannerRef}
          className={`w-full rounded-lg overflow-hidden transition-transform duration-700 ease-in-out px-2 ${
            isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <CustomImage
            src={concern_banner}
            width={1000}
            height={300}
            alt="Concern"
            className="w-full h-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="category flex items-center justify-center flex-wrap gap-[10px] sm:gap-6 flex-row">
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        >
          {category &&
            category.slice(0, 3).map((item) => (
              <Button
                onClick={() => {
                  setCategoryData(item);
                  handleSelectCategory(item.id);
                  setVisibleProducts(4); // Reset visible products when category changes
                }}
                key={item.id}
                isActive={categoryData?.id === item.id}
                style={
                  categoryData?.id === item.id
                    ? { background: "linear-gradient(180deg, #139804 0%, #063b00 100%)" }
                    : {}
                }
                className={`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[72px] border-[#139804] border-[1px] rounded-[35px] transition duration-300 ease-in-out uppercase text-[12px] bg-transparent ${
                  categoryData?.id === item.id
                    ? "text-white"
                    : "!text-neutral-black hover:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] hover:!text-white"
                }`}
              >
                {item.name}
              </Button>
            ))}
        </Suspense>
      </div>

      <div className="concern_product_area flex items-start gap-[80px] px-1">
        <div className="concern_right flex w-full flex-1 flex-col gap-[15px] sm:gap-6 ">
          {/* Desktop Carousel */}
          <Carousel 
            opts={{ align: "start" }} 
            className="w-full hidden md:block"
            onMouseEnter={handleCarouselInteraction}
            onTouchStart={handleCarouselInteraction}
          >
            <CarouselContent className="ml-0">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5"
                    >
                      <div className="min-w-0 w-full">
                        <ProductSkeleton />
                      </div>
                    </CarouselItem>
                  ))
                : getProductsToDisplay().map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="min-w-0 w-full">
                        <ProductItem {...product} />
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            
            {/* Only show navigation if there are more products */}
            {products.length > 4 && (
              <>
                <CarouselPrevious className="left-[0px] sm:left-[-17px]" />
                <CarouselNext className="right-[-0px] sm:right-[-17px]" />
              </>
            )}
          </Carousel>

          {/* Mobile Carousel */}
          <Carousel 
            opts={{ align: "start" }} 
            className="w-full block md:hidden"
            onTouchStart={handleCarouselInteraction}
          >
            <CarouselContent className="ml-0">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5"
                    >
                      <div className="min-w-0 w-full">
                        <ProductSkeleton />
                      </div>
                    </CarouselItem>
                  ))
                : getProductsToDisplay().map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="min-w-0 w-full">
                        <ProductItem {...product} />
                      </div>
                    </CarouselItem>
                  ))}
              
              {/* View All item for mobile */}
              <CarouselItem
                className="pl-1 md:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
              >
                {categoryData && (
                  <a className="min-w-full" href={`/category/${categoryData.slug || categoryData.id}`}>
                    <ProductViewAll productCount={products.length} />
                  </a>
                )}
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* View All Button */}
          {categoryData && (
            <div className="mt-0 flex justify-center items-center">
              <a
                href={`/category/${categoryData.slug || categoryData.id}`}
                style={{background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"}}
                className="flex justify-center items-center gap-2 py-2 px-5 text-white text-sm hover:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] hover:text-white border-[1px] rounded-[8px] transition"
              >
                View All
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_54830_1240)">
                    <path d="M11.5 5L14 7.5M14 7.5L11.5 10M14 7.5H0" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_54830_1240">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
