"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/app/config/api";

export default function OfferItem({ item }: { item: any }) {
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
    <Link href={`/flash-deal/${item.slug}`}>
      <div
        ref={ref}
        className={`offer_item overflow-hidden rounded-lg transition-transform duration-700 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <Image
          src={`${BASE_URL}/public/${item.banner}`}
          width={365}
          height={220}
          alt="offer"
          className="object-contain rounded-b-lg w-full h-auto"
        />
        <h3 className="mt-2 text-base sm:text-lg font-medium text-center text-neutral-black">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}
