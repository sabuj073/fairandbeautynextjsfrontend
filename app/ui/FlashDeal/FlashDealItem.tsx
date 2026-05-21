"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { BASE_URL } from "@/app/config/api";

export default function FlashDealItem({ item }: { item: any }) {
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
    <div ref={ref} className={`transition-transform md:mx-0 mx-4 duration-700 ease-in-out ${isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
      <Link href={`/recommendation/${item.slug}`}>
        <div className="relative flex items-center rounded-lg bg-pink-50 overflow-hidden">
          <div className="flex-1">
            <Image
              width={250}
              height={220}
              src={`${BASE_URL}/public/${item.banner}`}
              alt={item.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full py-2 px-4 bg-white bg-opacity-70 rounded-b-lg">
            <h2 className="text-sm lg:text-lg font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-pink-600 text-sm lg:text-2xl font-bold">
              {item?.upto_discount}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
