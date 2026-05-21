"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { productStore } from "@/lib/hooks/useProductStore";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
export default function SortByFilter({ translate_data }: any) {
  const searchParams = useSearchParams();
  const { setSidebarOpen, isSidebarOpen } = productStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const defaultSort = searchParams
    .get("sort_by") || ""

  const [selectedSort, setSelectedSort] = useState<string>(
    defaultSort
  );

  const handleFilterChange = useDebouncedCallback(
    (filterType: string, selectedFilters: string) => {
      setSelectedSort(selectedFilters)
      const params = new URLSearchParams(searchParams);
      if (filterType === "sort_by") {
        if (selectedFilters) {
          params.set("sort_by", selectedFilters);
        } else {
          params.delete("sort_by");
        }
      }
      replace(`${pathname}?${params.toString()}`);
    },
    100
  );
  const toggleSidebar = () => {
    console.log(isSidebarOpen)
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex 1">
      <button
        className="xl:hidden flex items-center bg-gray-200 p-2 rounded"
        onClick={toggleSidebar}
      >
        <Filter size={20} className="mr-2" />
      </button>
      <Select onValueChange={(value) => handleFilterChange('sort_by', value)}>
        <SelectTrigger className="w-[180px]"  >
          <SelectValue placeholder={`${translate_data?.sort_by}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="new_arrival">{translate_data?.sort_new_arrival}</SelectItem>
            <SelectItem value="popularity">{translate_data?.popularity}</SelectItem>
            <SelectItem value="top_rated">{translate_data?.top_rated}</SelectItem>
            <SelectItem value="price_low_to_high">{translate_data?.price_low_to_high}</SelectItem>
            <SelectItem value="price_high_to_low">{translate_data?.price_high_to_low}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select></div>





  )
}
