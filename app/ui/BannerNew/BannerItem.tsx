"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/app/config/api";

const imageSrc = (src?: string | null) => {
  if (!src) return "/fallback-image.png";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `${BASE_URL}${src}`;
  if (src.startsWith("uploads/")) return `${BASE_URL}/public/${src}`;
  if (src.startsWith("public/") || src.startsWith("storage/")) return `${BASE_URL}/${src}`;
  return `${BASE_URL}/public/${src}`;
};

export default function BannerItem({ item }: { item: any }) {
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

  return (
    <Link href={item.url || "/"}>
      <div
        ref={ref}
        className={`offer_item overflow-hidden rounded-lg transition-transform duration-700 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <img
          src={imageSrc(item.photo || item.banner)}
          alt="banner"
          className="object-contain w-full h-auto"
        />
      </div>
    </Link>
  );
}
