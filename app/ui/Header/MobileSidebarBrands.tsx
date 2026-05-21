"use client";

import React, { useRef, useMemo, useState } from "react";
import Link from "next/link";
import CustomImage from "../CustomImage/CustomImage";
import { usePathname } from "next/navigation";

type BrandSection = { letter: string; items: { id: number; name: string; slug: string; logo?: string }[] };

type MobileSidebarBrandsProps = {
  brands: BrandSection[];
  handCloseMenu: () => void;
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function MobileSidebarBrands({
  brands,
  handCloseMenu,
}: MobileSidebarBrandsProps) {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const normalizedBrands = useMemo(() => {
    if (!Array.isArray(brands)) return [];
    return brands.map((s) => ({
      letter: s.letter === "#" ? "0-9" : s.letter,
      key: s.letter,
      items: s.items || [],
    }));
  }, [brands]);

  const lettersWithData = useMemo(() => {
    const set = new Set(normalizedBrands.map((s) => s.letter));
    return ALPHABET.filter((L) => set.has(L));
  }, [normalizedBrands]);

  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const resolvedActiveLetter = activeLetter || normalizedBrands[0]?.key || null;

  const scrollToLetter = (key: string) => {
    const el = sectionRefs.current[key];
    if (!el) return;
    setActiveLetter(key);
    scrollContainerRef.current?.scrollTo({
      top: el.offsetTop - 8,
      behavior: "smooth",
    });
  };

  if (!normalizedBrands.length) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500 text-sm">
        No brands
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] min-h-0 flex flex-col overflow-hidden bg-white">
      {/* Sticky A-Z bar */}
      <div className="flex-shrink-0 sticky top-0 z-10 bg-white border-b border-gray-100 py-2 px-1">
        <div className="flex flex-wrap justify-center gap-x-0.5 gap-y-0.5 text-[9px] font-medium">
          {normalizedBrands.some((s) => s.key === "#") && (
            <button
              type="button"
              onClick={() => scrollToLetter("#")}
              className={`h-5 min-w-5 rounded-full px-1.5 flex items-center justify-center transition-colors ${
                resolvedActiveLetter === "#"
                  ? "bg-[#149804] text-white shadow-[0_4px_10px_rgba(20,152,4,0.22)]"
                  : "text-[#149804] hover:bg-[#e9f8e7]"
              }`}
            >
              0-9
            </button>
          )}
          {ALPHABET.map((L) => (
            <button
              key={L}
              type="button"
              onClick={() => scrollToLetter(L)}
              disabled={!lettersWithData.includes(L)}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                resolvedActiveLetter === L
                  ? "bg-[#149804] text-white shadow-[0_4px_10px_rgba(20,152,4,0.22)]"
                  : lettersWithData.includes(L)
                  ? "text-[#149804] hover:bg-[#e9f8e7]"
                  : "text-gray-300 cursor-default"
              }`}
            >
              {L}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable brand list grouped by letter */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto bg-[#f3fcfd] px-2.5 pb-6 pt-3"
      >
        {normalizedBrands.map((section) => (
          <div
            key={section.key}
            ref={(el) => {
              sectionRefs.current[section.key] = el;
            }}
            className="scroll-mt-2 pb-5"
          >
            <div
              className={`mb-3 flex h-11 items-center justify-between overflow-hidden rounded-r-[24px] pr-5 shadow-[0_6px_14px_rgba(15,23,42,0.04)] ${
                resolvedActiveLetter === section.key
                  ? "bg-[#edf9ec]"
                  : "bg-[#f7f7f7]"
              }`}
            >
              <div
                className={`h-full w-[5px] ${
                  resolvedActiveLetter === section.key ? "bg-[#149804]" : "bg-gray-950"
                }`}
              />
              <h2
                className={`mr-auto pl-5 text-[18px] font-semibold leading-none ${
                  resolvedActiveLetter === section.key ? "text-[#149804]" : "text-gray-950"
                }`}
              >
                {section.letter}
              </h2>
              <p className="text-[14px] font-normal text-gray-950">
                {section.items.length} {section.items.length === 1 ? "Brands" : "Brands"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {section.items.map((brand) => {
                const isActive = pathname === `/brand/${brand.slug}`;

                return (
                  <Link
                    key={brand.id}
                    href={`/brand/${brand.slug}`}
                    onClick={handCloseMenu}
                    className={`group flex min-h-[78px] flex-col items-center justify-center rounded-[9px] border px-2 py-3 text-center transition-all ${
                      isActive
                        ? "border-[#149804] bg-[#149804] text-white shadow-[0_12px_22px_rgba(20,152,4,0.22)]"
                        : "border-gray-300 bg-white text-gray-950 shadow-[0_4px_10px_rgba(15,23,42,0.03)] hover:border-[#149804] hover:bg-[#149804] hover:text-white hover:shadow-[0_12px_22px_rgba(20,152,4,0.18)]"
                    }`}
                  >
                    {brand.logo ? (
                      <div
                        className={`mb-1.5 flex h-9 w-14 items-center justify-center overflow-hidden rounded-md transition-colors ${
                          isActive ? "bg-white" : "bg-gray-50 group-hover:bg-white"
                        }`}
                      >
                        <CustomImage
                          src={brand.logo}
                          width={64}
                          height={36}
                          alt={brand.name}
                          className="max-h-8 w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[18px] font-semibold transition-colors ${
                          isActive
                            ? "bg-white text-[#149804]"
                            : "bg-gray-50 text-gray-950 group-hover:bg-white group-hover:text-[#149804]"
                        }`}
                      >
                        {brand.name.charAt(0)}
                      </div>
                    )}
                    <span className="line-clamp-2 text-[11px] font-normal leading-tight">
                      {brand.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
