"use client";

import React, { useState } from "react";
import { Filter, ArrowUpDown, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { productStore } from "@/lib/hooks/useProductStore";
import { useDebouncedCallback } from "use-debounce";

const SORT_OPTIONS = [
  { value: "new_arrival", labelKey: "sort_new_arrival" },
  { value: "popularity", labelKey: "popularity" },
  { value: "top_rated", labelKey: "top_rated" },
  { value: "price_low_to_high", labelKey: "price_low_to_high" },
  { value: "price_high_to_low", labelKey: "price_high_to_low" },
];

export default function MobileFilterSortBar({ translate_data, inline = false, totalItems, itemLabel = "item" }: any) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { setSidebarOpen } = productStore();
  const [sortPanelOpen, setSortPanelOpen] = useState(false);

  const currentSort = searchParams.get("sort_by") || "";

  const handleSortSelect = useDebouncedCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("sort_by", value);
      } else {
        params.delete("sort_by");
      }
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
      setSortPanelOpen(false);
    },
    100
  );

  const getSortLabel = (labelKey: string) => {
    return (translate_data && translate_data[labelKey]) || labelKey.replace(/_/g, " ");
  };

  return (
    <>
      {/* Fixed bottom bar - mobile only: white bg, less padding, light shadow, separator */}
      <div
        className={
          inline
            ? "md:hidden mx-3 my-5 grid grid-cols-[1fr_auto_auto] items-center border-y border-gray-200 bg-white"
            : "md:hidden fixed bottom-0 left-0 right-0 z-[99999] bg-white flex items-center justify-center border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] safe-area-pb"
        }
      >
        {inline && (
          <div className="py-4 pr-4 text-xl font-bold text-black">
            {totalItems ?? 0} {itemLabel}
          </div>
        )}
        <button
          type="button"
          onClick={() => setSortPanelOpen((p) => !p)}
          className={
            inline
              ? "flex items-center justify-center gap-1.5 border-l border-r border-gray-200 px-5 py-4"
              : "flex-1 flex items-center justify-center gap-1.5 py-2.5 border-r border-gray-200"
          }
        >
          <ArrowUpDown className="w-4 h-4 text-gray-700" />
          <span className="font-semibold uppercase text-xs text-gray-800">Sort</span>
        </button>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className={
            inline
              ? "flex items-center justify-center gap-1.5 px-5 py-4"
              : "flex-1 flex items-center justify-center gap-1.5 py-2.5"
          }
        >
          <Filter className="w-4 h-4 text-gray-700" />
          <span className="font-semibold uppercase text-xs text-gray-800">Filter</span>
        </button>
      </div>

      {/* Sort options panel - slides up from bottom when Sort is clicked */}
      {sortPanelOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-[99998] bg-black/40"
            onClick={() => setSortPanelOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-[99999] bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <span className="font-semibold text-gray-900">
                {translate_data?.sort_by || "Sort by"}
              </span>
              <button
                type="button"
                onClick={() => setSortPanelOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-2 pb-6">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSortSelect(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                    currentSort === opt.value
                      ? "bg-[#139804] text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {getSortLabel(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
