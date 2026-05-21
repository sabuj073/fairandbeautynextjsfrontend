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
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set<number>());
  const [isCarouselReady, setIsCarouselReady] = useState(false);

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

  useEffect(() => {
    if (carouselApi) {
      setIsCarouselReady(true);
      
      const onSelect = () => {
        const newIndex = carouselApi.selectedScrollSnap();
        setCurrentSlide(newIndex);
        
        const newLoaded = new Set(loadedIndexes);
        const start = Math.max(0, newIndex - RENDER_BUFFER);
        const end = Math.min(products.length - 1, newIndex + visibleSlides + RENDER_BUFFER - 1);
        
        for (let i = start; i <= end; i++) {
          newLoaded.add(i);
        }
        
        setLoadedIndexes(newLoaded);
      };

      carouselApi.on('select', onSelect);
      
      const initialLoaded = new Set<number>();
      const initialEnd = Math.min(products.length - 1, visibleSlides + RENDER_BUFFER - 1);
for (let i = 0; i <= initialEnd; i++) {
  initialLoaded.add(i);
}
      setLoadedIndexes(initialLoaded);

      return () => {
        carouselApi.off('select', onSelect);
      };
    }
  }, [carouselApi, products.length, visibleSlides]);


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
    setLoadedIndexes(new Set());
    setCurrentSlide(0);
    setIsCarouselReady(false);
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

  // Fallback: If carousel isn't ready yet, show first few products
  const shouldShowFallback = !isCarouselReady && products.length > 0;
  const fallbackProducts = products.slice(0, visibleSlides + RENDER_BUFFER);

  return (
    <>
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
                }}
                key={item.id}
                isActive={categoryData?.id === item.id}
                style={
                  categoryData?.id === item.id
                    ? { background: "linear-gradient(180deg, #139804 0%, #063b00 100%)" }
                    : {}
                }
                className={`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[72px] border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out uppercase text-[12px] bg-transparent ${
                  categoryData?.id === item.id
                    ? "text-white"
                    : "!text-neutral-black hover:bg-primary-hover hover:!text-white"
                }`}
              >
                {item.name}
              </Button>
            ))}
        </Suspense>
      </div>

      <div style={{marginTop: "-10px"}} className="concern_product_area flex items-start gap-[80px] px-1">
        <div className="concern_right flex w-full flex-1 flex-col gap-[15px] sm:gap-6 ">
          {/* Desktop Carousel */}
          <Carousel 
            opts={{ align: "center" }} 
            className="w-full hidden md:block"
            setApi={setCarouselApi}
          >
            <CarouselContent className="ml-0">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 lg:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5"
                    >
                      <ProductSkeleton />
                    </CarouselItem>
                  ))
                : shouldShowFallback
                  ? fallbackProducts.map((product, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                      >
                        <ProductItem {...product} />
                      </CarouselItem>
                    ))
                  : products.map((product, index) => {
                      const shouldRender = index >= start && index <= end;
                      const isLoaded = loadedIndexes.has(index);
                      
                      return (
                        <CarouselItem
                          key={index}
                          className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                        >
                          <div className={`
                            transition-opacity duration-300
                            ${isLoaded ? "opacity-100" : "opacity-0"}
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

          {/* Mobile Carousel */}
          <Carousel 
            opts={{ align: "center" }} 
            className="w-full block md:hidden"
            setApi={setCarouselApi}
          >
            <CarouselContent className="ml-0">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-0 lg:pl-2 basis-[50%] sm:basis-1/3 md:basis-1/3 xl:basis-1/5"
                    >
                      <ProductSkeleton />
                    </CarouselItem>
                  ))
                : shouldShowFallback
                  ? fallbackProducts.map((product, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                      >
                        <ProductItem {...product} />
                      </CarouselItem>
                    ))
                  : products.map((product, index) => {
                      const shouldRender = index >= start && index <= end;
                      const isLoaded = loadedIndexes.has(index);
                      
                      return (
                        <CarouselItem
                          key={index}
                          className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                        >
                          <div className={`
                            transition-opacity duration-300
                            ${isLoaded ? "opacity-100" : "opacity-0"}
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
              <CarouselItem
                className="pl-0 lg:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
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
            <div className="mt-0 flex justify-center">
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