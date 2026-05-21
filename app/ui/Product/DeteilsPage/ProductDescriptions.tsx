"use client";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React, { useState, useEffect, useMemo } from "react";
import CustomImage from "../../CustomImage/CustomImage";

import type { ProductDetails } from "@/types/api";

type ProductDescriptionsProps = {
  productDetails: ProductDetails;
};

// Helper function to check if content has meaningful data
const hasContent = (value: string | null | undefined): boolean => {
  if (!value) return false;
  // Strip HTML tags and check if there's actual content
  const stripped = value.replace(/<[^>]*>/g, '').trim();
  // Ignore placeholder texts
  if (stripped.toLowerCase() === 'description' || 
      stripped.toLowerCase() === 'ingredient' || 
      stripped.toLowerCase() === 'ingredients' ||
      stripped.toLowerCase() === 'bangla' ||
      stripped.toLowerCase() === 'how to use' ||
      stripped.toLowerCase() === 'q&a' ||
      stripped.toLowerCase() === 'skin care routine' ||
      stripped === '') {
    return false;
  }
  return stripped.length > 0;
};

export default function ProductDescriptions({
  productDetails,
}: ProductDescriptionsProps) {
  const [customerImages, setCustomerImages] = useState<string[]>([]);

  // Filter tabs that have actual content
  const availableTabs = useMemo(() => {
    const allTabs = [
      { id: "DESCRIPTION", label: "DESCRIPTION", content: productDetails.description },
      { id: "BANGLA", label: "BANGLA", content: productDetails.bangla },
      { id: "INGREDIENTS", label: "INGREDIENTS", content: productDetails.ingredient },
      { id: "HOW TO USE", label: "HOW TO USE", content: productDetails.how_to_use },
      { id: "Q&A", label: "Q&A", content: productDetails.qa },
      { id: "SKIN CARE ROUTINE", label: "SKIN CARE ROUTINE", content: productDetails.skin_care_routine },
    ];
    
    return allTabs.filter(tab => hasContent(tab.content));
  }, [productDetails]);

  // Set the first available tab as active
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (availableTabs.length > 0 && !activeTab) {
      setActiveTab(availableTabs[0].id);
    }
  }, [availableTabs, activeTab]);

  // Fetch reviews to get customer images
  useEffect(() => {
    const fetchCustomerImages = async () => {
      try {
        const prodId = Number(productDetails.id);
        if (!prodId || isNaN(prodId)) {
          return;
        }

        const response = await fetch(`/api/products/${prodId}/reviews`);
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (data.success && data.data && Array.isArray(data.data)) {
          const allImages: string[] = [];
          data.data.forEach((review: any) => {
            if (review.images && Array.isArray(review.images)) {
              review.images.forEach((img: string) => {
                if (img && !allImages.includes(img)) {
                  allImages.push(img);
                }
              });
            }
          });
          setCustomerImages(allImages);
        }
      } catch (error) {
        console.error("Error fetching customer images:", error);
      }
    };

    if (productDetails.id) {
      fetchCustomerImages();
    }
  }, [productDetails.id]);

  const getActiveContentHtml = () => {
    switch (activeTab) {
      case "DESCRIPTION":
        return productDetails.description || "";
      case "BANGLA":
        return productDetails.bangla || "";
      case "INGREDIENTS":
        return productDetails.ingredient || "";
      case "HOW TO USE":
        return productDetails.how_to_use || "";
      case "Q&A":
        return productDetails.qa || "";
      case "SKIN CARE ROUTINE":
        return productDetails.skin_care_routine || "";
      default:
        return "";
    }
  };

  // If no tabs have content, don't render the section
  if (availableTabs.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 md:mx-2">

      {/* Tab Buttons - Only show tabs with content */}
      <div className="md:flex md:flex-wrap grid grid-cols-3 gap-2 mb-4">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              borderImage: "linear-gradient(180deg, #139804 0%, #063B00 100%)",
              border: "2px solid"
            }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap flex-shrink-0 overflow-hidden text-ellipsis max-w-[120px] ${
              activeTab === tab.id
                ? "bg-[linear-gradient(180deg,_#139804_0%,_#063B00_100%)] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            title={tab.label}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="border border-gray-300 rounded-md p-4 bg-white min-h-[150px]">
        <div
          className="text-base font-normal text-black"
          dangerouslySetInnerHTML={{ __html: getActiveContentHtml() }}
        />
      </div>

      {customerImages.length > 0 && (
        <div className="p-3 rounded-xl mt-4" style={{border: "1px solid #AAAAAA"}}>
          <h1 className="text-base font-semibold mb-3">
            Customer Images ({customerImages.length})
          </h1>
          <div>
            <Carousel
              opts={{
                align: 'center',
              }}
              className="w-full"
            >
              <CarouselContent className='ml-0'>
                {customerImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-0 lg:pl-2 basis-auto flex-shrink-0 w-auto">
                    <div className="rounded-2xl border-2 border-gray-200 w-[100px] overflow-hidden mr-2">
                      <CustomImage
                        src={image}
                        width={100}
                        height={100}
                        alt={`customer-image-${index + 1}`}
                        className="object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}