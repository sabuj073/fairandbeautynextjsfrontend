"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import CustomImage from "../CustomImage/CustomImage";
import { ListProductSkeleton, SearchProductSkeleton } from "../skeletons";
import { useRouter } from "next/navigation";

export default function DesktopSearch({ isDialogOpen, setIsDialogOpen }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestion, setSuggestion] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const response: any = await axios.get(`/api/search?name=${searchInput}`);
      setSearchItems(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const response: any = await axios.get(
        `/api/search/suggestions?query_key=${searchInput || ""}`
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
      getData();
    } else {
      setSearchItems([]);
      setSuggestion([]);
    }
  }, [searchInput]);

  return (
    <div className="flex flex-col container relative p-0">
      {/* Search Input */}
      <div className="search_input flex items-center relative">
        <input
          onChange={(e: any) => setSearchInput(e.target.value)}
          type="text"
          placeholder="I am shopping for..."
          className="md:w-[700px] xxl:w-[900px] border-[1px] p-[8px] border-[#006938] rounded-lg shadow-none focus:shadow-none focus:outline-none ring-0"
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
          className="search_icon absolute right-[4px] top-[2.5px] h-[36px] w-[80px] rounded-sm text-white"
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
          className="flex gap-6 overflow-y-auto 2xl:h-[540px] h-[330px] absolute top-[50px] left-0 bg-white border shadow-md w-full z-[50000] p-4"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="quick_link pt-[30px] flex gap-[10px] flex-col w-[400px]">
            <h3 className="text-base font-bold text-neutral-black">
              Quick Links
            </h3>
            <ul className="flex gap-[10px] flex-col pb-10">
              {loading ? (
                <ListProductSkeleton />
              ) : (
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
          <div className="product_search pt-[30px]">
            {loading ? (
              <SearchProductSkeleton />
            ) : (
              searchItems.map((item: any) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  onClick={() => setIsDialogOpen(!isDialogOpen)}
                >
                  <div className="flex items-center gap-4 mb-4 border-b-[1px] pb-3">
                    <CustomImage
                      width={80}
                      height={80}
                      src={item.thumbnail_image}
                      alt="Product"
                      className="w-[80px] h-[80px] object-cover rounded-md"
                    />
                    <div>
                      <p className="text-sm text-gray-600">{item?.name}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-primary-500 text-lg font-semibold">
                          {item?.main_price}
                        </span>
                        <span className="text-gray-400 text-sm ml-2 line-through">
                          {item?.stroked_price}
                        </span>
                        <span className="text-green-500 text-sm ml-2">
                          {item?.discount}% off
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
