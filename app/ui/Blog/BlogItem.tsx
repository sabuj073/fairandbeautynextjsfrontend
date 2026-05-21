"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomImage from "../CustomImage/CustomImage";
import ReadMore from "./ReadMore";

export default function BlogItem({ item }: { item: any }) {
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
    <div
      ref={ref}
      style={{border: "3px solid #095D004D"}}
      className={`ingredients_item rounded-lg overflow-hidden transition-transform duration-700 ease-in-out ${
        isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"
      }`}
    >
      <div className="blog_thumbnail overflow-hidden">
        <CustomImage
          src={item.banner}
          width={400}
          height={368}
          alt="Blog"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="blog_content flex flex-col md:gap-[15px] text-center bg-white text-[#231F20] p-[20px]">
        <p className="text-[18px] md:text-[25px] line-clamp-2">{item.title}</p>
        <p className="text-base mb-2 md:mb-0">{item.created_at}</p>
        <ReadMore link={item.slug} />
      </div>
    </div>
  );
}
