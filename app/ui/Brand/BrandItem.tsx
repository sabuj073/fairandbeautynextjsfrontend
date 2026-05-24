"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { BASE_URL } from "@/app/config/api";

const imageSrc = (src?: string | null) => {
  if (!src) return "/fallback-image.png";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `${BASE_URL}${src}`;
  return `${BASE_URL}/public/${src}`;
};

export default function BrandItem({ item, size }: { item: any; size: "large" | "small" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const width = size === "large" ? 262 : 160;
  const height = size === "large" ? 262 : 160;

  return (
    <Link href={`/brand/${item.slug}`}>
      <div
        ref={ref}
        className={`brand_item flex items-center justify-center flex-col gap-3 transition-transform duration-700 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <Image
          src={imageSrc(item.logo)}
          width={width}
          height={height}
          alt={item.name}
          className="object-contain rounded-[25px] w-full h-auto"
        />
        <div className="flex flex-col gap-[6px] sm:gap-[13px] text-center pt-0 sm:pt-3">
          <h3 className="text-[14px] sm:text-[25px] font-medium text-neutral-black">
            {item.name}
          </h3>
          <h5 className="text-[14px] sm:text-base font-medium text-neutral-black">
            {item.discount}% OFF
          </h5>
        </div>
      </div>
    </Link>
  );
}
