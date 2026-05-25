"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductItem from "@/app/ui/Product/ProductItem";
import { CategoryFeatured } from "@/types/api";
import { Button } from "../button";
import { useState, useEffect, useRef } from "react";
import { getProductByCategory } from "@/lib/apiData";
import { CategorySkeleton, ProductSkeleton } from "@/app/ui/skeletons";
import { cookieStore } from "@/lib/hooks/useCookieStore";

interface ConcernCategoryProps {
  category: CategoryFeatured[];
}

// Number of slides to pre-render on each side of visible slides
const RENDER_BUFFER = 2;

// Skeleton loader component
const ProductItemSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg p-4 h-[300px] flex flex-col">
    <div className="bg-gray-300 h-40 rounded-md mb-3"></div>
    <div className="bg-gray-300 h-4 rounded mb-2"></div>
    <div className="bg-gray-300 h-4 rounded w-3/4 mb-3"></div>
    <div className="bg-gray-300 h-6 rounded w-1/2 mt-auto"></div>
  </div>
);

export default function ConcernCategoryProduct({
  category,
}: ConcernCategoryProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryFeatured | null>();
  const [loading, setLoading] = useState(false);
  const [activeConcern, setActiveConcern] = useState<CategoryFeatured | null>(null);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set());

  const handleSelectCategory = async (categoryId: number) => {
    setLoading(true);
    const fetchedProducts = await getProductByCategory(categoryId);
    setProducts(fetchedProducts);
    setLoading(false);
    // Reset loaded indexes when category changes
    setLoadedIndexes(new Set());
    setCurrentSlide(0);
    carouselApi?.scrollTo?.(0);
  };

  useEffect(() => {
    if (category && category?.length > 0) {
      const firstCategory = category[0];
      const firstConcern = firstCategory.children?.[0] ?? null;

      setCategoryData(firstCategory);
      setActiveConcern(firstConcern);
      handleSelectCategory(firstConcern?.id ?? firstCategory.id);
    }
  }, [category]);

  // Update visible slides count based on screen size
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(2);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(3);
      } else {
        setVisibleSlides(4);
      }
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  // Handle carousel events to track current slide
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const newIndex = carouselApi.selectedScrollSnap();
      setCurrentSlide(newIndex);
      
      // Mark this slide and nearby slides as loaded
      const newLoaded = new Set(loadedIndexes);
      const start = Math.max(0, newIndex - RENDER_BUFFER);
      const end = Math.min(products.length - 1, newIndex + visibleSlides + RENDER_BUFFER - 1);
      
      for (let i = start; i <= end; i++) {
        newLoaded.add(i);
      }
      
      setLoadedIndexes(newLoaded);
    };

    carouselApi.on('select', onSelect);
    onSelect();

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi, products.length, visibleSlides]);

  // Calculate which slides should be visible
  const getVisibleRange = () => {
    const start = Math.max(0, currentSlide - RENDER_BUFFER);
    const end = Math.min(products.length - 1, currentSlide + visibleSlides + RENDER_BUFFER - 1);
    return { start, end };
  };

  const { start, end } = getVisibleRange();

  const concernFilters = categoryData?.children ?? [];

  const handleConcernClick = (item: CategoryFeatured) => {
    setActiveConcern(item);
    handleSelectCategory(item.id);
  };

  return (
    <>
      <div className="category flex items-center justify-center flex-wrap gap-[6px] mx-4 md:mx-0 sm:gap-6 flex-row">
        <Carousel opts={{ align: "center" }} className="w-full">
            <CarouselContent className="ml-0 md:justify-center">
              {
                category &&
                category.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="pl-0 lg:pl-2 basis-auto"
                    >
                      <Button
              onClick={() => {
                setCategoryData(item);
                const firstConcern = item.children?.[0] ?? null;
                setActiveConcern(firstConcern);
                handleSelectCategory(firstConcern?.id ?? item.id);
              }}
              key={item.id}
              isActive={categoryData?.id === item.id}
              className={`inline-block mr-1 py-[6px] sm:py-[10px] px-[30px] sm:px-[20px] border-[1px] rounded-[8px] transition duration-300 ease-in-out uppercase text-[12px] font-bold bg-transparent ${
                categoryData?.id === item.id
                  ? "bg-arival text-white"
                  : "!text-neutral-black hover:!text-white"
              }`}
            >
              {item.name}
            </Button>
                    </CarouselItem>
                  ))
              }
            </CarouselContent>
          </Carousel>
      </div>
      
      <div className="flex w-full justify-center items-center">
        <p className="text-center"><span className="font-semibold">Select the concern below</span> to find<br /> the Products you need.</p>
      </div>
      
      <div className="category flex items-center md:mx-0 mx-4 justify-center flex-wrap gap-[16px] sm:gap-6 flex-row">
        <Carousel opts={{ align: "center" }} className="w-full">
            <CarouselContent className="ml-0 md:justify-center">
              {
                concernFilters.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="pl-0 lg:pl-2 basis-auto"
                    >
                      <Button
            onClick={() => handleConcernClick(item)}
            key={item.id}
            isActive={activeConcern?.id === item.id}
            className={`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[20px] border-[1px] mr-1 rounded-[8px] font-bold transition duration-300 ease-in-out uppercase text-[12px] bg-transparent ${
              activeConcern?.id === item.id
                ? "bg-arival text-white"
                : "!text-neutral-black hover:!text-white"
            }`}
          >
            {item.name}
          </Button>
                    </CarouselItem>
                  ))
              }
            </CarouselContent>
          </Carousel>
      </div>

      <div className="concern_product_area flex items-start gap-[80px]">
        <div className="concern_right flex w-full flex-1 flex-col px-0 gap-[15px] sm:gap-6 ">
          <Carousel 
            opts={{ align: "start" }} 
            className="w-full"
            setApi={setCarouselApi}
          >
            <CarouselContent className="ml-0 gap-0">
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
                : products.map((product, index) => {
                    const shouldRender = index >= start && index <= end;
                    const isLoaded = loadedIndexes.has(index);
                    
                    return (
                      <CarouselItem
                        key={index}
                        className="pl-1 md:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                      >
                        <div className={`
                          min-w-0 w-full transition-opacity duration-300
                          ${isLoaded ? "opacity-100" : "opacity-100"}
                        `}>
                          {shouldRender ? (
                            <ProductItem {...product} />
                          ) : isLoaded ? (
                            <ProductItemSkeleton />
                          ) : (
                            <div className="h-[300px]"></div>
                          )}
                        </div>
                      </CarouselItem>
                    );
                  })}
            </CarouselContent>
          </Carousel>

          {categoryData && (
            <div className="mt-0 flex justify-center">
              <a
                href={`/category/${activeConcern?.slug || categoryData.slug || activeConcern?.id || categoryData.id}`}
                className="flex justify-center items-center gap-2 py-2 px-5 bg-white text-white text-sm hover:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] hover:text-white border-[linear-gradient(180deg,#139804_0%,#063b00_100%)] border-[1px] rounded-[8px] bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] transition"
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
