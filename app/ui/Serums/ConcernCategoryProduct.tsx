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
import clsx from "clsx";

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
  const [singleProduct, setSingleProduct] = useState<any>({});
  const [categoryData, setCategoryData] = useState<CategoryFeatured | null>();
  const [loading, setLoading] = useState(false);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set());

  const { heading_title_value } = cookieStore();
  const concern_banner = heading_title_value?.concern_banner;

  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
  // Handle carousel events to track current slide
useEffect(() => {
  if (!carouselApi) return;

  const onSelect = () => {
    const newIndex = carouselApi.selectedScrollSnap();
    setCurrentSlide(newIndex);
    
    // Use functional update to avoid dependency on loadedIndexes
    setLoadedIndexes(prevLoaded => {
      const newLoaded = new Set(prevLoaded);
      const start = Math.max(0, newIndex - RENDER_BUFFER);
      const end = Math.min(products.length - 1, newIndex + visibleSlides + RENDER_BUFFER - 1);
      
      for (let i = start; i <= end; i++) {
        newLoaded.add(i);
      }
      
      return newLoaded;
    });
  };

  carouselApi.on('select', onSelect);
  
  // Manually trigger the initial loading
  // Get the initial slide index and load surrounding slides
  const initialIndex = carouselApi.selectedScrollSnap();
  const initialStart = Math.max(0, initialIndex - RENDER_BUFFER);
  const initialEnd = Math.min(products.length - 1, initialIndex + visibleSlides + RENDER_BUFFER - 1);
  
  const initialLoaded = new Set<number>();
  for (let i = initialStart; i <= initialEnd; i++) {
    initialLoaded.add(i);
  }
  setLoadedIndexes(initialLoaded);
  setCurrentSlide(initialIndex);

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

  const handleSelectCategory = async (categoryId: number) => {
    setLoading(true);
    const fetchedProducts = await getProductByCategory(categoryId);
    setProducts(fetchedProducts);
    setSingleProduct(fetchedProducts[0])
    setLoading(false);
    // Reset loaded indexes when category changes
    setLoadedIndexes(new Set());
    setCurrentSlide(0);
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

  const { start, end } = getVisibleRange();

  return (
    <>
      <div className="sm:flex hidden section_heading text-center items-center justify-between">
        <h2 className={clsx('ml-2 relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-start flex-wrap')}>
          <div className={clsx('text-neutral-black relative')}>Serums & Treatment</div>
        </h2>
        {categoryData && (
          <div className="sm:flex hidden mt-4 justify-center">
            <a
              style={{background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"}}
              href={`/category/${categoryData.slug || categoryData.id}`}
              className="inline-block py-2 px-6 text-white text-sm hover:bg-primary-hover hover:text-white border-[1px] rounded-[8px] transition"
            >
              View All
            </a>
          </div>
        )}
      </div>

      <div className="flex sm:hidden section_heading text-center items-center justify-center">
        <h2 className={clsx('min-w-[70%] relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-center flex-wrap custom-border')}>
          <div className={clsx('text-neutral-black relative')}>Serums & Treatment</div>
        </h2>
      </div>
      
      <div className="concern_banner">
        <div
          ref={bannerRef}
          className={`w-full rounded-lg px-2 overflow-hidden transition-transform duration-700 ease-in-out ${
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
      
      <div className="category flex items-center justify-center flex-wrap gap-[6px] sm:gap-6 flex-row">
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        >
          {/* Category buttons commented out as in original */}
        </Suspense>
      </div>

      <div style={{marginTop: "-20px"}} className="concern_product_area flex items-start gap-[80px] px-1">
        <div className="concern_right flex w-full flex-1 flex-col gap-[15px] sm:gap-6 ">
          {/* Desktop Carousel with Lazy Loading */}
          <Carousel 
            opts={{ align: "center" }} 
            className="w-full hidden md:block"
            setApi={setCarouselApi}
          >
            <CarouselContent className="ml-0">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 lg:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5"
                    >
                      <ProductSkeleton />
                    </CarouselItem>
                  ))
                : products &&
                  products.length > 0 &&
                  products.map((product, index) => {
                    const shouldRender = index >= start && index <= end;
                    const isLoaded = loadedIndexes.has(index);
                    
                    return (
                      <CarouselItem
                        key={index}
                        className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                      >
                        <div className={`
                          transition-opacity duration-300
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

          {/* Mobile Grid View with Lazy Loading */}
          <div className="w-full md:hidden">
            <div className="grid grid-cols-2 gap-0 sm:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index}>
                      <ProductSkeleton />
                    </div>
                  ))
                : products &&
                  products.length > 0 &&
                  products.slice(0, 6).map((product, index) => (
                    <div key={index}>
                      <ProductItem {...product} />
                    </div>
                  ))}
            </div>
          </div>

          {/* View All Button */}
          {categoryData && (
            <div className="sm:hidden mt-4 flex justify-center">
              <a
                style={{background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"}}
                href={`/category/${categoryData.slug || categoryData.id}`}
                className="flex justify-center items-center gap-2 py-2 px-5 text-white text-sm hover:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] hover:text-white border-[1px] rounded-[8px] transition"
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