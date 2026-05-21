"use client";

import React from 'react';
import Link from 'next/link';
import CustomImage from '../CustomImage/CustomImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type CategoryMobileProps = {
  menus: any[];
};

export default function CategoryMobile({ menus }: CategoryMobileProps) {
  if (!menus || !Array.isArray(menus)) return null;

  // Limit to max 8 categories for mobile view
  const mobileMenus = menus.slice(0, 8);

  return (
    <>
      {/* Desktop View (Carousel) - remains exactly the same */}
      <div className="hidden md:block ml-8 relative min-h-[90px] md:mb-8">
        <div className="absolute top-[-70px] md:top-[-50px] left-0 right-0 z-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="flex justify-center items-center">
              {menus.map((item: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-auto flex-shrink-0 px-2"
                >
                  <Link href={`/category/${item?.slug}`}>
                    <div className="flex flex-col items-center justify-center gap-y-1">
                      <div
                        className="rounded-lg overflow-hidden relative"
                        style={{ 
                          borderRadius: "16px", 
                          borderBottom: "0px", 
                          backdropFilter: "blur(10px)", 
                          WebkitBackdropFilter: "blur(5px)", 
                          border: "8px solid rgba(255, 255, 255, 0.5)",  
                          height: "100%", 
                          width: "100%",
                        }}
                      >
                        <CustomImage
                          width={80}
                          height={80}
                          src={item?.icon}
                          alt={item?.name}
                          loading="eager"
                          style={{ 
                            objectFit: 'cover', 
                            minWidth: '120px', 
                            height: '102px', 
                            borderRadius: '9px 9px 0px 0px',
                          }}
                        />
                        <p 
                          style={{
                            background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"
                          }} 
                          className="body6 font-[500] text-white text-[18px] text-center z-10"
                        >
                          {item?.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Mobile View (Grid) - new 4-column grid */}
      <div style={{marginTop: "-27px"}} className="md:hidden w-full px-4 py-4">
        <div className="grid grid-cols-4 gap-[8px]">
          {mobileMenus.map((item: any, index: number) => (
            <Link key={index} href={`/category/${item?.slug}`}>
              <div className="flex flex-col items-center justify-center gap-y-1">
                <div
                  className="rounded-lg overflow-hidden relative"
                  style={{ 
                    borderRadius: "14px", 
                    borderBottom: "0px", 
                    backdropFilter: "blur(10px)", 
                    WebkitBackdropFilter: "blur(5px)", 
                    border: "2px solid #095D004D",  
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <CustomImage
                    width={64}
                    height={64}
                    src={item?.icon}
                    alt={item?.name}
                    loading="eager"
                    style={{ 
                      objectFit: 'cover', 
                      width: '100%', 
                      height: '80px', 
                      borderRadius: '9px 9px 0px 0px',
                    }}
                  />
                  <p 
                    style={{
                      background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"
                    }} 
                    className="body6 font-[500] text-white text-[10px] text-center py-1 z-10"
                  >
                    {item?.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}