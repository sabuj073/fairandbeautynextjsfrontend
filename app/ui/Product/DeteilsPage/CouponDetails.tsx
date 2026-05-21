"use client";
import React, { useState, useRef, useEffect } from "react";
import { CouponIcon, CouponLeftArrowIcon, CouponRightArrowIcon } from "../../Icons/Icons";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { API_BASE_URL } from "@/app/config/api";

interface Coupon {
  id: number;
  code: string;
  discount: number;
  discount_type: string;
  discount_text: string;
  description: string;
  expiry_date: string;
  start_date: string;
  end_date: string;
}

interface CouponDetailsProps {
  productId: number;
}

export default function CouponDetails({ productId }: CouponDetailsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        // Use Next.js API route to avoid CORS issues
        const response = await fetch(`/api/products/${productId}/coupons`);
        if (!response.ok) {
          console.error("Failed to fetch coupons:", response.status);
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        
        // Response structure: { success: true, data: [...coupons] }
        if (data.success && data.data && Array.isArray(data.data)) {
          setCoupons(data.data);
        } else if (data.data && Array.isArray(data.data)) {
          // Fallback if success flag is missing
          setCoupons(data.data);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchCoupons();
    }
  }, [productId]);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, coupons]);

  const scrollPrev = () => {
    if (api) api.scrollPrev();
  };

  const scrollNext = () => {
    if (api) api.scrollNext();
  };

  if (loading) {
    return (
      <div className="mt-0 md:px-3 md:mx-2 py-2 rounded-lg">
        <h1 className="text-base font-semibold mb-3">Available Offers</h1>
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!coupons || coupons.length === 0) {
    // Show section even when empty for debugging - remove this later
    return (
      <div className="mt-0 md:px-3 md:mx-2 py-2 rounded-lg">
        <h1 className="text-base font-semibold mb-3">Available Offers</h1>
        <div className="text-center text-gray-500 text-sm">No coupons available for this product</div>
      </div>
    );
  }

  return (
    <div className="mt-4 md:px-3 md:mx-2 py-2 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-base font-semibold">Available Offers</h1>
        {coupons.length > 1 && (
          <div className="flex gap-1 items-center">
            <button 
              onClick={scrollPrev}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous coupon"
              disabled={current === 1}
            >
              <CouponLeftArrowIcon />
            </button>
            <button 
              onClick={scrollNext}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next coupon"
              disabled={current === count}
            >
              <CouponRightArrowIcon />
            </button>
          </div>
        )}
      </div>

      <div className="mt-2">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            align: "center",
            loop: coupons.length > 1,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="ml-0">
            {coupons.map((coupon) => (
              <CarouselItem key={coupon.id} className="pl-0 lg:pl-2 basis-auto flex-shrink-0 w-auto">
                <div className="rounded-2xl w-[280px] mr-2 border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden relative">
                  {/* SVG Background */}
                  <div className="absolute inset-0 opacity-30">
                    <CouponIcon />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="relative p-4 flex flex-col justify-between min-h-[136px] z-10">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-gray-700 bg-white/90 px-2 py-1 rounded border border-gray-300">Coupon</span>
                    </div>
                    
                    <div className="mt-auto space-y-2">
                      <div className="text-xl font-bold text-gray-900">
                        {coupon.discount_text}
                      </div>
                      <div className="text-xs text-gray-700 line-clamp-2 bg-white/80 px-2 py-1 rounded">
                        {coupon.description || `Flat ${coupon.discount}${coupon.discount_type === 'percent' ? '%' : ''} discount`}
                      </div>
                      <div className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                        Offer Expiry Date: {coupon.expiry_date || coupon.end_date}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
