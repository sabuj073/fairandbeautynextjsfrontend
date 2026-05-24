"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { BASE_URL } from "@/app/config/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomTranslateHeading from "../CustomTranslateHeading";

type RecommendationItem = {
  id: number;
  title: string;
  slug: string;
  upto_discount?: string | null;
  short_description?: string | null;
  banner?: string | null;
};

type Props = {
  items: RecommendationItem[];
  style: "old_style" | "style_1" | "style_2";
  styleOneBackground: {
    color: string;
    image: string | null;
    textColor: string;
  };
};

const imageSrc = (src?: string | null) => {
  if (!src) return "/fallback-image.png";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `${BASE_URL}${src}`;
  return `${BASE_URL}/public/${src}`;
};

export default function FlashDealClient({ items, style, styleOneBackground }: Props) {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!items.length) {
    return null;
  }

  if (style === "old_style") {
    return (
      <div className="flex flex-col gap-6">
        <CustomTranslateHeading title="FAIR AND BEAUTY RECOMMENDATION" translateKey="authentic_recommendation" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/recommendation/${item.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-lg bg-pink-50 transition-transform duration-500 group-hover:-translate-y-1">
                <img
                  src={imageSrc(item.banner)}
                  alt={item.title}
                  className="h-auto w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-white/70 px-4 py-2">
                  <h2 className="text-sm font-semibold text-gray-800 lg:text-lg">{item.title}</h2>
                  {item.upto_discount && (
                    <p className="text-sm font-bold text-pink-600 lg:text-2xl">{item.upto_discount}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (style === "style_2") {
    return (
      <div className="flex flex-col gap-4">
        <CustomTranslateHeading title="FAIR AND BEAUTY RECOMMENDATION" translateKey="authentic_recommendation" />
        <Carousel setApi={setApi} opts={{ align: "center", loop: true }} className="w-full">
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.id} className="basis-full pl-0">
                <Link href={`/recommendation/${item.slug}`} className="group block w-full">
                  <div className="overflow-hidden rounded-lg border border-[#eef0f4] bg-white">
                    <div className="relative aspect-[1.55/1] w-full overflow-hidden bg-[#f8f8fb]">
                      <img
                        src={imageSrc(item.banner)}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#8d7bb5] bg-white/90 text-[#6f5c91] shadow-sm">
                        <ChevronRight className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="px-4 py-3 sm:px-5">
                      <h3 className="text-[18px] font-medium leading-tight text-[#20232d] sm:text-[22px]">
                        {item.title}
                      </h3>
                      {item.upto_discount && (
                        <p className="mt-1 text-[14px] font-semibold text-[#20232d] sm:text-[16px]">
                          {item.upto_discount}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 hidden bg-white/90 md:flex" />
          <CarouselNext className="right-2 hidden bg-white/90 md:flex" />
        </Carousel>

        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to recommendation slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                selectedIndex === index ? "w-7 bg-[#3d4150]" : "w-2.5 bg-[#d5d7dd]"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-lg bg-cover bg-center px-4 py-5 sm:px-6 md:py-8"
      style={{
        backgroundColor: styleOneBackground.color || "#ffffff",
        backgroundImage: styleOneBackground.image ? `url(${imageSrc(styleOneBackground.image)})` : undefined,
        "--recommendation-text-color": styleOneBackground.textColor || "#20232d",
      } as CSSProperties}
    >
      <div className="flex flex-col gap-4">
      <CustomTranslateHeading
        title="FAIR AND BEAUTY RECOMMENDATION"
        translateKey="authentic_recommendation"
        className="[color:var(--recommendation-text-color)]"
      />
      <Carousel setApi={setApi} opts={{ align: "center", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {items.map((item, index) => {
            const isActive = selectedIndex === index;

            return (
          <CarouselItem key={item.id} className="basis-[78%] py-4 pl-4 sm:basis-[54%] lg:basis-[38%]">
              <Link href={`/recommendation/${item.slug}`} className="group block w-full">
                <div
                  className={`overflow-hidden rounded-lg border border-[#edf0f5] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition-all duration-500 ${
                    isActive ? "relative z-10 scale-100" : "scale-[0.92]"
                  }`}
                >
                  <div className="aspect-[1.15/1] overflow-hidden bg-[#f8fafc]">
                    <img
                      src={imageSrc(item.banner)}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-3 py-3 text-center">
                    <h3 className="line-clamp-1 text-[20px] font-semibold leading-tight text-[#20232d]">
                      {item.upto_discount || item.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[13px] leading-tight text-[#20232d] sm:text-[15px]">
                      {item.short_description || item.title}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-1 hidden bg-white/90 md:flex" />
        <CarouselNext className="right-1 hidden bg-white/90 md:flex" />
      </Carousel>

      <div className="flex justify-center">
        <div className="h-2 w-20 overflow-hidden rounded-full bg-[#eceef2]">
          <div
            className="h-full rounded-full bg-[#3d4150] transition-all"
            style={{
              width: `${scrollSnaps.length ? 100 / scrollSnaps.length : 100}%`,
              transform: `translateX(${selectedIndex * 100}%)`,
            }}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
