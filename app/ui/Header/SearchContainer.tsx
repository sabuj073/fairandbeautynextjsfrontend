"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ListProductSkeleton } from "../skeletons";
import { usePathname, useRouter } from "next/navigation";

export default function SearchContainer() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isProductDetail, setIsProductDetail] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchSuggestion, setSuggestion] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // 👈 NEW state
  const pathname = usePathname();

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const response: any = await axios.get(
        `/api/search/suggestions?query_key=${searchInput}`
      );
      setSuggestion(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      getSuggestion();
    } else {
      setSuggestion([]);
    }
  }, [searchInput]);
  useEffect(() => {
      if (pathname && pathname.includes("/product/")) {
        setIsProductDetail(true);
      } else {
        setIsProductDetail(false);
      }
    }, [pathname]);

  return (
    <div className={`flex flex-col w-full ${isProductDetail? "px-[4px] pr-[14px] pb-0" : "px-[17px] pr-[16px] pb-3"} relative`}>
      <div className="search_input flex items-center relative w-full md:w-[750px]">
        <input
          type="text"
          placeholder="I am shopping for..."
          className="min-w-full w-full border-[1px] pl-1 h-[38px] border-[#006938] rounded-lg shadow-none focus:shadow-none focus:outline-none ring-0"
          onChange={(e: any) => setSearchInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button
          onClick={() => {
            if (searchInput !== "") {
              router.push(`/search?query=${searchInput}`);
              setIsDialogOpen(!isDialogOpen);
            }
          }}
          className="search_icon absolute right-[4px] top-[2.5px] h-[32px] w-[81px] rounded-sm text-white"
          style={{
            background: "linear-gradient(180deg, #139804 0%, #063b00 100%)",
          }}
        >
          Search
        </Button>
      </div>

      {/* Search Dropdown */}
      {isFocused && searchInput !== "" && (
        <div
          className="quick_link pt-[30px] flex gap-[30px] flex-col absolute top-[42px] md:-left-0 left-0 bg-white border shadow-md md:min-w-full min-w-[72vh]  z-[50000] p-4"
          onMouseDown={(e) => e.preventDefault()} // keep open when clicking inside
        >
          <h3 className="text-base font-bold text-neutral-black">Quick Links</h3>
          <ul className="flex gap-[10px] flex-col pb-10">
            {loading ? (
              <ListProductSkeleton />
            ) : (
              searchSuggestion &&
              searchSuggestion.length > 0 &&
              searchSuggestion.map((item: any) => (
                <li
                  key={item.id}
                  className="h-[40px] overflow-hidden line-clamp-2"
                >
                  <Link
                    className="text-base border-primary border-b pb-[7px]"
                    onClick={() => setIsDialogOpen(!isDialogOpen)}
                    href={`/search?query=${item.query}`}
                  >
                    {item?.query}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}