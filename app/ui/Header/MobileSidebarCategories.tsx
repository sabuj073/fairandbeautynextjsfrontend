"use client";

import React, { useState } from "react";
import Link from "next/link";
import CustomImage from "../CustomImage/CustomImage";
import { ChevronRight } from "lucide-react";

interface MenuItem {
  id: number;
  slug: string;
  name: string;
  icon_menu?: string | null;
  icon?: string | null;
  banner?: string | null;
  banner_image?: string | null;
  mobile_banner?: string | null;
  children?: MenuItem[];
}

type MobileSidebarCategoriesProps = {
  menu_data: MenuItem[];
  handCloseMenu: () => void;
};

export default function MobileSidebarCategories({
  menu_data,
  handCloseMenu,
}: MobileSidebarCategoriesProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    menu_data?.length ? menu_data[0].id : null
  );

  const selectedCategory = menu_data?.find((m) => m.id === selectedId);
  const hasCategories = Array.isArray(menu_data) && menu_data.length > 0;
  const selectedBanner =
    selectedCategory?.mobile_banner ||
    selectedCategory?.banner_image ||
    selectedCategory?.banner ||
    selectedCategory?.icon_menu;

  if (!hasCategories) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500 text-sm">
        No categories
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-0">
      {/* Left: main categories list */}
      <div className="flex-shrink-0 w-[100px] border-r border-gray-200 bg-[#f7f7f7] overflow-y-auto">
        {menu_data.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            className={`w-full flex flex-col items-center gap-1 py-3 px-2 text-center border-l-3 border-transparent transition-colors ${
              selectedId === item.id
                ? "bg-white border-l-[3px] border-[#CC0F99] text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {(item.icon_menu || item.icon) ? (
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#F0F0F0]">
                <CustomImage
                  src={item.icon_menu || item.icon || ""}
                  width={40}
                  height={40}
                  alt={item.name}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center text-xs font-semibold text-gray-600">
                {item.name.charAt(0)}
              </div>
            )}
            <span className="text-[10px] leading-tight line-clamp-2">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right: sub-categories and child categories */}
      <div className="flex-1 min-w-0 overflow-y-auto bg-white p-4">
        {selectedCategory && (
          <>
            <Link
              href={`/category/${selectedCategory.slug}`}
              onClick={handCloseMenu}
              className="group relative mb-5 block w-full overflow-hidden rounded-[22px] bg-[#f5f1ff] shadow-[0_8px_18px_rgba(17,24,39,0.06)]"
            >
              {selectedBanner ? (
                <CustomImage
                  src={selectedBanner}
                  width={260}
                  alt={selectedCategory.name}
                  className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex min-h-[78px] w-full items-center bg-gradient-to-r from-[#f2efff] to-[#fff4f9] px-5">
                  <span className="max-w-[72%] text-[20px] font-extrabold leading-[1.05] text-[#238c9a]">
                    {selectedCategory.name}
                  </span>
                </div>
              )}
              <span className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-[0_2px_8px_rgba(17,24,39,0.16)]">
                <ChevronRight className="h-5 w-5" />
              </span>
            </Link>

            {/* Sub-categories as sections with child grid */}
            {Array.isArray(selectedCategory.children) &&
            selectedCategory.children.length > 0 ? (
              selectedCategory.children.map((sub) => {
                const childItems = Array.isArray(sub.children)
                  ? sub.children
                  : [];
                const hasChildren = childItems.length > 0;
                const gridItems = hasChildren ? childItems : [sub];
                return (
                  <div key={sub.id} className="mb-5">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">
                      {sub.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {gridItems.map((item) => {
                        const iconUrl = item.icon_menu || item.icon;
                        return (
                          <Link
                            key={item.id}
                            href={`/category/${item.slug}`}
                            onClick={handCloseMenu}
                            className="flex flex-col items-center justify-center p-2"
                          >
                            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-[#F0F0F0] mb-2">
                              {iconUrl ? (
                                <CustomImage
                                  src={iconUrl}
                                  width={56}
                                  height={56}
                                  alt={item.name}
                                  className="object-contain"
                                />
                              ) : (
                                <span className="text-base font-bold text-gray-500">
                                  {item.name.charAt(0)}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-gray-800 text-center line-clamp-2">
                              {item.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <Link
                href={`/category/${selectedCategory.slug}`}
                onClick={handCloseMenu}
                className="block py-4 text-center text-sm text-primary font-medium"
              >
                View all in {selectedCategory.name}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
