"use client";
import { Slider } from "antd";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function PriceFilter({ translate_data, minPrice, maxPrice }: any) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const defaultSelectedMinPrice = parseInt(searchParams.get("min_price") || `${minPrice}`);
  const defaultSelectedMaxPrice = parseInt(searchParams.get("max_price") || `${maxPrice}`);

  useEffect(() => {
    setPriceRange([defaultSelectedMinPrice, defaultSelectedMaxPrice]);
  }, [defaultSelectedMinPrice, defaultSelectedMaxPrice]);

  const handleFilterChange = useDebouncedCallback(
    (value: [number, number]) => {
      const [min_price, max_price] = value;
      setPriceRange(value);

      const params = new URLSearchParams(searchParams);
      if (min_price > 0 && max_price > min_price) {
        params.set("min_price", min_price.toString());
        params.set("max_price", max_price.toString());
      } else {
        params.delete("min_price");
        params.delete("max_price");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  const [expandedSections, setExpandedSections] = useState(true);

  return (
    <div className="mb-4">
      <button
        className={`flex justify-between items-center w-full py-2 px-4 transition-colors duration-200 ${expandedSections ? 'bg-blue_light text-primary ' : 'bg-filter_light'} `}
        onClick={() => setExpandedSections(!expandedSections)}
      >
        <span className="font-medium">{translate_data.filter_by} {translate_data.price} </span>
        {expandedSections ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {expandedSections && minPrice && maxPrice && (
        <div className="mt-2 pl-4">
          <Slider
            range
            min={Number(minPrice) || 0}
            max={Number(maxPrice) || 1000}
            defaultValue={[
              Number(defaultSelectedMinPrice) || 0,
              Number(defaultSelectedMaxPrice) || 1000
            ]}
            value={priceRange.map(Number)}
            onChange={(value: number[]) => handleFilterChange(value as [number, number])}
            step={100}
            tooltip={{ formatter: (value) => `৳${value}` }}
          />

        </div>
      )}
    </div>
  );
}
