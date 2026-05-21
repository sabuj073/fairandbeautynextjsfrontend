"use client";
import React, { useEffect, useState } from "react";
import { Filter, Minus, Plus, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import PriceFilter from "./PriceFilter";
import { productStore } from "@/lib/hooks/useProductStore";
import { Slider } from "antd";


const FilterSection = ({
  title,
  items = [],
  expanded,
  onToggle,
  onFilterChange,
  selectedFilters,
  minPrice,
  maxPrice
}: any) => {
  return (
    <div className="mb-4">
      <button
        className={`flex justify-between items-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200  ${expanded ? 'bg-blue_light text-primary ' : 'bg-filter_light'} `}
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        {expanded ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {expanded && (
        <div className="mt-2 pl-4">
          {items.map((item: any, index: any) => {
            // Extract and round any percentage value in item.name
            const formattedName = item.name.replace(/(\d+(\.\d+)?)%/g, (_: string, num: string) => {
              return `${Math.round(parseFloat(num))}%`;
            });

            return (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`${title}-${index}`}
                  className="mr-2"
                  checked={selectedFilters.includes(item.id)}
                  onChange={() => onFilterChange(item.id)}
                />
                <label htmlFor={`${title}-${index}`} className="text-sm">
                  {formattedName}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ discount_data, translate_data, brand_id, category_id, minPrice, maxPrice, subcategories, filter_categories, filter_brand, attributes = [] }: any) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setSidebarOpen, isSidebarOpen } = productStore();
  const hasPriceFilter = searchParams.has("min_price") || searchParams.has("max_price");
  // Parse the `categories` and `subCategory` search params to get default selected values
  const defaultSelectedCategories = searchParams
    .get("categories")
    ?.split(",")
    .map(Number) || [];


  const defaultSelectedBrands = searchParams
    .get("brands")
    ?.split(",")
    .map(Number) || [];
  const defaultSelectedDiscount = searchParams
    .get("discount")
    ?.split(",")
    .map(Number) || [];

  const defaultSelectedAttributeValues =
    searchParams.get("attribute_values")?.split(",") || [];

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    subCategories: true,
    discount: true,
    brands: true,
    price: true,
    attributes: {} as { [key: number]: boolean },
  });

  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    defaultSelectedCategories
  );

  const [selectedBrands, setSelectedBrands] = useState<number[]>(
    defaultSelectedBrands || []
  );
  const [selectedDiscount, setSelectedDiscount] = useState<number[]>(
    defaultSelectedDiscount
  );

  const [attribute_values, setSelectedAttribute_values] = useState<string[]>(
    defaultSelectedAttributeValues
  );

  const [activeMobileSection, setActiveMobileSection] = useState("quick");
  const [mobileCategories, setMobileCategories] = useState<number[]>(defaultSelectedCategories);
  const [mobileBrands, setMobileBrands] = useState<number[]>(defaultSelectedBrands);
  const [mobileDiscount, setMobileDiscount] = useState<number[]>(defaultSelectedDiscount);
  const [mobileAttributes, setMobileAttributes] = useState<string[]>(defaultSelectedAttributeValues);
  const [mobilePrice, setMobilePrice] = useState<[number, number]>([
    Number(searchParams.get("min_price") || minPrice || 0),
    Number(searchParams.get("max_price") || maxPrice || 0),
  ]);

  const toggleSection = (section: string | number, isAttribute: boolean = false) => {
    setExpandedSections((prev: any) => {
      if (isAttribute) {
        return {
          ...prev,
          attributes: {
            ...prev.attributes,
            [section]: !prev.attributes[section],
          },
        };
      }
      return {
        ...prev,
        [section]: !prev[section],
      };
    });
  };

  const handleFilterChange = useDebouncedCallback(
    (filterType: string, selectedFilters: number[]) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (filterType === "categories") {
        if (selectedFilters.length > 0) {
          params.set("categories", selectedFilters.join(","));
        } else {
          params.delete("categories");
        }
      }

      if (filterType === "subCategories") {
        if (selectedFilters.length > 0) {
          params.set("subCategory", selectedFilters.join(","));
        } else {
          params.delete("subCategory");
        }
      }
      if (filterType === "brands") {
        if (selectedFilters.length > 0) {
          params.set("brands", selectedFilters.join(","));
        } else {
          params.delete("brands");
        }
      }
      if (filterType === "discount") {
        if (selectedFilters.length > 0) {
          params.set("discount", selectedFilters.join(","));
        } else {
          params.delete("discount");
        }
      }
      if (filterType === "attribute_values") {
        if (attribute_values.length > 0) {
          params.set("attribute_values", selectedFilters.join(","));
        } else {
          params.delete("attribute_values");
        }
      }
      replace(`${pathname}?${params.toString()}`);
    },
    100
  );


  const onCategoryChange = (categoryId: number) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);
    handleFilterChange("categories", updatedCategories);
  };

  // onBrandsChange
  const onBrandsChange = (value: number) => {
    const updatedBrands = selectedBrands.includes(value)
      ? selectedBrands.filter((id) => id !== value)
      : [...selectedBrands, value];
    setSelectedBrands(updatedBrands);
    handleFilterChange("brands", updatedBrands);
  };
  // onDiscountChange
  const onDiscountChange = (discountValue: number) => {
    const updatedDiscount = selectedDiscount.includes(discountValue)
      ? selectedDiscount.filter((id) => id !== discountValue)
      : [...selectedDiscount, discountValue];
    setSelectedDiscount(updatedDiscount);
    handleFilterChange("discount", updatedDiscount);
  };

  // onAttribute_valuesChange
  const onAttribute_valuesChange = (value: string) => {
    const updated = attribute_values.includes(value)
      ? attribute_values.filter((id) => id !== value)
      : [...attribute_values, value];
    setSelectedAttribute_values(updated);
    handleFilterChange("attribute_values", updated as any);
  };

  const categories = filter_categories.map((item: any) => ({
    name: item?.name,
    slug: item?.slug,
    id: item?.id,
  }));

  const brands = filter_brand.map((item: any) => ({
    name: item?.name,
    slug: item?.slug,
    id: item?.id,
  }));

  useEffect(() => {
    if (!isSidebarOpen) return;
    setMobileCategories(defaultSelectedCategories);
    setMobileBrands(defaultSelectedBrands);
    setMobileDiscount(defaultSelectedDiscount);
    setMobileAttributes(defaultSelectedAttributeValues);
    setMobilePrice([
      Number(searchParams.get("min_price") || minPrice || 0),
      Number(searchParams.get("max_price") || maxPrice || 0),
    ]);
  }, [isSidebarOpen, searchParams, minPrice, maxPrice]);

  // Set all attributes to true by default
  // useEffect(() => {
  //   const initialAttributesState: { [key: number]: boolean } = {};
  //   attributes.forEach((_: any, index: number) => {
  //     initialAttributesState[index] = true;
  //   });
  //   setExpandedSections((prev) => ({
  //     ...prev,
  //     attributes: initialAttributesState,
  //   }));
  // }, [attributes]);


  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileNumber = (list: number[], value: number) => {
    return list.includes(value) ? list.filter((id) => id !== value) : [...list, value];
  };

  const toggleMobileString = (list: string[], value: string) => {
    return list.includes(value) ? list.filter((id) => id !== value) : [...list, value];
  };

  const clearMobileFilters = () => {
    setMobileCategories([]);
    setMobileBrands([]);
    setMobileDiscount([]);
    setMobileAttributes([]);
    setMobilePrice([Number(minPrice || 0), Number(maxPrice || 0)]);
  };

  const applyMobileFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (mobileCategories.length) params.set("categories", mobileCategories.join(","));
    else params.delete("categories");

    if (mobileBrands.length) params.set("brands", mobileBrands.join(","));
    else params.delete("brands");

    if (mobileDiscount.length) params.set("discount", mobileDiscount.join(","));
    else params.delete("discount");

    if (mobileAttributes.length) params.set("attribute_values", mobileAttributes.join(","));
    else params.delete("attribute_values");

    const minBound = Number(minPrice || 0);
    const maxBound = Number(maxPrice || 0);
    const priceChanged =
      mobilePrice[0] > minBound || (maxBound > 0 && mobilePrice[1] < maxBound);

    if (priceChanged && mobilePrice[0] && mobilePrice[1] && mobilePrice[1] > mobilePrice[0]) {
      params.set("min_price", mobilePrice[0].toString());
      params.set("max_price", mobilePrice[1].toString());
    } else {
      params.delete("min_price");
      params.delete("max_price");
    }

    replace(`${pathname}?${params.toString()}`);
    setSidebarOpen(false);
  };

  const mobileTabs = [
    {
      id: "quick",
      label: "Quick Filters",
      count: mobileDiscount.length,
    },
    {
      id: "categories",
      label: translate_data?.categories || "Categories",
      count: mobileCategories.length,
    },
    {
      id: "brand",
      label: translate_data?.brand || "Brand",
      count: mobileBrands.length,
    },
    {
      id: "price",
      label: translate_data?.price || "Price Range",
      count: hasPriceFilter ? 1 : 0,
    },
    {
      id: "discount",
      label: translate_data?.discount || "Discount",
      count: mobileDiscount.length,
    },
    ...attributes.map((item: any, index: number) => ({
      id: `attribute-${index}`,
      label: item?.name || `Filter ${index + 1}`,
      count: item?.attribute_values?.filter((value: any) => mobileAttributes.includes(value.value)).length || 0,
    })),
  ];

  const renderMobileOptions = () => {
    if (activeMobileSection === "quick" || activeMobileSection === "discount") {
      return (
        <MobileOptionList
          items={discount_data.map((item: any) => ({ ...item, id: Number(item.id) }))}
          selected={mobileDiscount}
          onToggle={(id: number) => setMobileDiscount((prev) => toggleMobileNumber(prev, id))}
        />
      );
    }

    if (activeMobileSection === "categories") {
      return (
        <MobileOptionList
          items={categories}
          selected={mobileCategories}
          onToggle={(id: number) => setMobileCategories((prev) => toggleMobileNumber(prev, id))}
        />
      );
    }

    if (activeMobileSection === "brand") {
      return (
        <MobileOptionList
          items={brands}
          selected={mobileBrands}
          onToggle={(id: number) => setMobileBrands((prev) => toggleMobileNumber(prev, id))}
        />
      );
    }

    if (activeMobileSection === "price") {
      return (
        <div className="px-5 py-6">
          <div className="mb-5 flex items-center justify-between text-sm text-gray-700">
            <span>Tk {mobilePrice[0] || minPrice || 0}</span>
            <span>Tk {mobilePrice[1] || maxPrice || 0}</span>
          </div>
          <Slider
            range
            min={Number(minPrice) || 0}
            max={Number(maxPrice) || 1000}
            step={100}
            value={mobilePrice}
            onChange={(value) => setMobilePrice(value as [number, number])}
            tooltip={{ formatter: (value) => `Tk ${value}` }}
          />
        </div>
      );
    }

    if (activeMobileSection.startsWith("attribute-")) {
      const index = Number(activeMobileSection.replace("attribute-", ""));
      const attribute = attributes[index];
      const items = (attribute?.attribute_values || []).map((item: any) => ({
        id: item.value,
        name: item.value,
      }));

      return (
        <MobileOptionList
          items={items}
          selected={mobileAttributes}
          onToggle={(id: string) => setMobileAttributes((prev) => toggleMobileString(prev, id))}
        />
      );
    }

    return null;
  };


  return (
    <div className=" xl:w-[300px]" >
      <div
        className={`aiz-filter-sidebar collapse-sidebar-wrap sidebar-xl sidebar-right z-[999999999] ${isSidebarOpen ? 'active' : ''} `}
      >

        <div className="overlay overlay-fixed dark c-pointer" onClick={toggleSidebar}> </div>
        <div className="md:hidden fixed inset-0 z-[999999999] bg-white text-left">
          <div className="flex h-12 items-center justify-between border-b border-gray-200 px-4">
            <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
            <button
              type="button"
              className="text-xs font-semibold uppercase text-[#f0447d]"
              onClick={clearMobileFilters}
            >
              Clear All
            </button>
          </div>

          <div className="flex h-[calc(100vh-104px)] overflow-hidden">
            <div className="w-[34%] shrink-0 overflow-y-auto bg-gray-50">
              {mobileTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveMobileSection(tab.id)}
                  className={`flex min-h-[52px] w-full items-center justify-between border-b border-gray-100 px-3 text-left text-[13px] ${
                    activeMobileSection === tab.id
                      ? "bg-white font-semibold text-gray-900"
                      : "font-normal text-gray-600"
                  }`}
                >
                  <span className="line-clamp-2">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="ml-2 text-[11px] text-gray-500">{tab.count}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
              {renderMobileOptions()}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-[1000000000] grid h-14 grid-cols-2 border-t border-gray-200 bg-white">
            <button
              type="button"
              onClick={toggleSidebar}
              className="text-sm font-semibold uppercase text-gray-500"
            >
              Close
            </button>
            <button
              type="button"
              onClick={applyMobileFilters}
              className="border-l border-gray-200 text-sm font-semibold uppercase text-[#f0447d]"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="collapse-sidebar c-scrollbar-light text-left hidden md:block">


          <div className="flex items-center pb-4 border-b-[1px] justify-between pt-2 xl:pt-0 pl-2 xl:pl-0 " >
            <div className="flex items-center " >
              <Filter size={20} className="mr-2" /> <span>{translate_data?.filter_by}</span>
            </div>
            <button className="xl:hidden flex items-center p-2" onClick={toggleSidebar}>
              <X size={20} className="mr-2" /> <span>{translate_data?.close}</span>
            </button>
          </div>
          <div className={` bg-white p-4 rounded-lg shadow-sm`}>

            <FilterSection
              title={`${translate_data.filter_by} ${translate_data.categories} `}
              items={categories}
              expanded={expandedSections.categories}
              onToggle={() => toggleSection("categories")}
              onFilterChange={onCategoryChange}
              selectedFilters={selectedCategories}
            />

            {

              !category_id && subcategories && <FilterSection
                title={`${translate_data.filter_by} ${translate_data.sub_categories}`}
                items={subcategories}
                expanded={expandedSections.subCategories}
                onToggle={() => toggleSection("subCategories")}
                onFilterChange={onCategoryChange}
                selectedFilters={selectedCategories}
              />
            }

            {
              attributes.map((parentItem: any, index: any) => (
                <FilterSection
                  key={index}
                  title={`Filter By ${parentItem?.name}`}
                  items={parentItem.attribute_values.map((item: any) => ({
                    id: item.value,
                    name: item.value,
                  }))}
                  expanded={expandedSections.attributes[index]}
                  onToggle={() => toggleSection(index, true)}
                  onFilterChange={onAttribute_valuesChange}
                  selectedFilters={attribute_values}
                />
              ))
            }


            <FilterSection
              title={`${translate_data.filter_by} ${translate_data.discount} `}
              items={discount_data}
              expanded={expandedSections.discount}
              onToggle={() => toggleSection("discount")}
              onFilterChange={onDiscountChange}
              selectedFilters={selectedDiscount}
            />
            {/* PriceFilter  */}
            <PriceFilter minPrice={minPrice} maxPrice={maxPrice} translate_data={translate_data} />
            <FilterSection
              title={`${translate_data.filter_by} ${translate_data.brand}`}
              items={brands}
              expanded={expandedSections.brands}
              onToggle={() => toggleSection("brands")}
              onFilterChange={onBrandsChange}
              selectedFilters={selectedBrands}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

const MobileOptionList = ({ items = [], selected = [], onToggle }: any) => {
  return (
    <div className="divide-y divide-gray-100">
      {items.length > 0 ? (
        items.map((item: any, index: number) => {
          const formattedName = String(item?.name || "").replace(
            /(\d+(\.\d+)?)%/g,
            (_: string, num: string) => `${Math.round(parseFloat(num))}%`
          );
          const checked = selected.includes(item.id);

          return (
            <button
              key={`${item.id}-${index}`}
              type="button"
              onClick={() => onToggle(item.id)}
              className="flex min-h-[48px] w-full items-center justify-between gap-3 px-5 py-3 text-left"
            >
              <span className={`text-[13px] ${checked ? "font-semibold text-gray-900" : "font-normal text-gray-600"}`}>
                {formattedName}
              </span>
              <span className={`grid h-5 w-5 place-items-center rounded-sm border ${
                checked ? "border-[#f0447d] bg-[#f0447d]" : "border-gray-300 bg-white"
              }`}>
                {checked && (
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-white">
                    <path d="M7.8 13.4 3.9 9.5 2.6 10.8l5.2 5.2L18 5.8 16.7 4.5z" />
                  </svg>
                )}
              </span>
            </button>
          );
        })
      ) : (
        <div className="px-5 py-8 text-sm text-gray-400">No filters available</div>
      )}
    </div>
  );
};

export default FilterSidebar;
