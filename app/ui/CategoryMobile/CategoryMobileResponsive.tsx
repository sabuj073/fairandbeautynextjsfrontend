// import React from 'react'
// import CustomImage from '../CustomImage/CustomImage';
// import Link from 'next/link';

// export default function CategoryMobile({ menus }: any) {
//     return (
//         <div id="main_category_show_home" className='flex md:hidden w-full flex-row overflow-x-scroll scrollbar-hide  gap-x-2 pb-0 pt-[10px] px-4  '>
//             {
//                 menus.map((item: any, index: any) => (
//                     <Link key={index} href={`/category/${item?.slug}`} >
//                         <div className='flex grow items-center justify-center flex-col gap-y-1'>
//                             <div className='rounded-lg overflow-hidden' style={{ height: "64px", width: "64px" }}>
//                                 <CustomImage width={64} height={64} src={item?.icon} alt={item?.name} className="" loading="eager" />
//                             </div>
//                             <p className=" body6 font-semibold">{item?.name}</p>
//                         </div></Link>

//                 ))
//             }



//         </div>
//     )
// }


"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CustomImage from '../CustomImage/CustomImage'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'

type CategoryMobileProps = {
  menus: any[]
}

export default function CategoryMobile({ menus }: CategoryMobileProps) {
  const pathname = usePathname()
  
  // Hide on product page or if menus are invalid
  if (pathname === '/' || !menus || !Array.isArray(menus)) {
    return null
  }

  return (
    <div className="md:hidden px-4">
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
        <CarouselContent className="flex">
          {menus.map((item: any, index: number) => (
            <CarouselItem
              key={index}
              className="basis-auto flex-shrink-0 px-2"
            >
              <Link href={`/category/${item?.slug}`}>
                <div className="flex flex-col items-center justify-center gap-y-1">
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <CustomImage
                      width={64}
                      height={64}
                      src={item?.icon}
                      alt={item?.name}
                      loading="eager"
                    />
                  </div>
                  <p className="body6 font-semibold">{item?.name}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}