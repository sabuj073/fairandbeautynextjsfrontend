"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ImageButton } from "./ImageButton";
import "./Gallery.css";
import CustomImage from "@/app/ui/CustomImage/CustomImage";
import { DotButton } from "@/app/ui/Banner/EmblaCarouselDotButton";
import useCartStoreData from "@/lib/hooks/useCartStoreData";
import { productStore } from "@/lib/hooks/useProductStore";
import RatingPill from "../../RatingPill";
type Image = {
  variant?: string;
  path?: string;
};

type PropType = {
  id?: number;
  images?: any[];
  options?: EmblaOptionsType;
  handleOptionChange?: (title: string, value: any) => void;
  handleColorChange?: (color: any) => void;
  setSelectedColorId?: (id: number) => void;
  colors?: any[]; // Also pass colors array
  rating?: number;
  ratingCount?: number;
  topRated?: number;
  topRatedLabel?: string;
  topRatedBgColor?: string;
  topRatedTextColor?: string;
};

const GalleryImage: React.FC<PropType> = (props) => {
  const { combinationImage } = productStore();
  const { setResetProduct, resetProduct } = useCartStoreData();
  const {
    images,
    options,
    id,
    handleOptionChange,
    handleColorChange,
    setSelectedColorId,
    colors = [],
    rating,
    ratingCount,
    topRated,
    topRatedLabel,
    topRatedBgColor,
    topRatedTextColor,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(combinationImage || 0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    dragFree: false,
    axis: "x",
    slidesToScroll: 1, // optional but helps
  });


  useEffect(() => {
    if (typeof id === 'number') {
      setResetProduct(id);
    }
  }, [id, setResetProduct]);


  const onThumbClick = (index: number) => {
    if (!emblaMainApi) return;

    emblaMainApi.scrollTo(index);
    setSelectedIndex(index);

    const selectedImage = images![index];

    // Auto-select color if applicable
    if (selectedImage.color_id && colors && setSelectedColorId && handleColorChange) {
      const color = colors.find(c => c.id === selectedImage.color_id);
      if (color) {
        setSelectedColorId(color.id);
        handleColorChange(color);
      }
    }

    // Auto-select variant option (e.g., Weight)
    if (selectedImage.weight && handleOptionChange) {
      handleOptionChange("Weight", selectedImage.weight);
    }
  };

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);

    const selectedThumb = emblaThumbsApi.slideNodes()[index] as HTMLElement;
    const thumbsViewport = emblaThumbsApi.rootNode() as HTMLElement;

    if (selectedThumb && thumbsViewport) {
      const thumbHeight = selectedThumb.offsetHeight;
      const viewportHeight = thumbsViewport.offsetHeight;
      const thumbOffsetTop = selectedThumb.offsetTop;

      const scrollPosition =
        thumbOffsetTop - viewportHeight / 2 + thumbHeight / 2;

      emblaThumbsApi.scrollTo(index, false);
      emblaThumbsApi.containerNode().scrollTop = scrollPosition;
    }
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    if (emblaMainApi && combinationImage !== null && combinationImage !== undefined) {
      emblaMainApi.scrollTo(combinationImage); // Scroll to the specified image index
      setSelectedIndex(combinationImage); // Update the selected index state
    }
  }, [combinationImage, emblaMainApi]);


  return (

    <div className="gallery flex flex-col w-full gap-4">
    {/* Main image viewer */}
    <div className="w-full lg:w-[100%]">
      <div className="gallery__viewport" ref={emblaMainRef}>
        <div className="gallery__container">
          {(images ?? []).map((image: any, index: any) => (
            <div className="gallery__slide flex justify-center w-full" key={index}>
              <CustomImage
                src={image.path}
                width={520}
                height={220}
                alt={`Slide ${index}`}
                className="rounded-xl w-full max-h-[600px] object-contain border"
              />
            </div>
          ))}
        </div>
        <div className="relative">
          <RatingPill
            className="absolute bottom-0 left-0"
            rating={rating}
            reviewCount={ratingCount}
            showLabel={(topRated ?? 0) > 0}
            label={topRatedLabel || "Top Rated"}
            labelBgColor={topRatedBgColor}
            labelTextColor={topRatedTextColor}
          />
        </div>
      </div>
    </div>


    {/* Thumbnail Carousel with Left/Right buttons */}
    <div className="relative w-full">
      {/* Left Scroll Button */}
      <button
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border"
        onClick={() => emblaThumbsApi?.scrollPrev()}
        aria-label="Scroll Left"
      >
        ◀
      </button>

      {/* Right Scroll Button */}
      <button
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md border"
        onClick={() => emblaThumbsApi?.scrollNext()}
        aria-label="Scroll Right"
      >
        ▶
      </button>

      {/* Embla Viewport */}
      <div
        className="overflow-hidden px-12"
        ref={emblaThumbsRef}
      >
        <div className="flex transition-transform will-change-transform">
          {(images ?? []).map((image: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 basis-1/5 pr-2" // 5 thumbnails per view
            >
              <button
                onClick={() => onThumbClick(index)}
                className={`border-2 rounded-md overflow-hidden w-full h-full transition-all ${
                  selectedIndex === index ? "border-accent" : "border-transparent"
                }`}
              >
                <CustomImage
                  src={image.path}
                  width={80}
                  height={80}
                  alt={`Thumb ${index}`}
                  className="object-cover w-full h-[60px] lg:h-[80px]"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>


  </div>

  );
};

export default GalleryImage;
