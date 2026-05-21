"use client";

import React, { useEffect, useRef, useState } from 'react';
import CustomLink from '../CustomLink';
import ViewCollection from './ViewCollection';
import CustomImage from '../CustomImage/CustomImage';

export default function IngredientItem({ data, desk }: any) {
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
      className={`rounded-[12px] ingredients_item ${desk ? '' : 'basis-[296px]'}`}
    >
      <div
        className={`${
          desk ? '' : 'w-[296px]'
        } h-auto transition-transform duration-700 ease-in-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <CustomImage
          src={data?.banner}
          width={desk ? 435 : 296}
          height={desk ? 339 : 339}
          alt="offer"
          className="object-contain rounded-lg w-full h-auto"
        />
      </div>
      <div className="p-3 sm:p-0 flex flex-col rounded-b-lg items-center shadow-md justify-center mb-2 pb-2">
        <h3 className="text-base pb-[10px] border-b-[2px] border-black pt-3 text-center w-full">
          {data.title}
        </h3>
        <p className="text-sm py-[15px] text-center">{data?.short_description}</p>
        <ViewCollection link={`/ingredient/${data?.slug}`} />
      </div>
    </div>
  );
}
