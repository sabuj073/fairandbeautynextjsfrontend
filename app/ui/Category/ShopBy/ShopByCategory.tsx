"use client"
import Image from 'next/image'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, } from '@/components/ui/carousel'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'
import Heading from '../../Section/Heading'
export default function ShopByCategory({title,data}:any) {
    return (
      
            <div className='shop_by_section mx-3 md:mx-0' >
                <div className='mb-4'>
                <Heading title={title}  />
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: false
                    }}
                    className="w-full"
                >
                    <CarouselContent className="ml-0">
                        {data.map((itemChild: any, index: any) => (
                            <CarouselItem key={index} className="pl-2 basis-1/5 md:basis-1/6 xl:basis-[12.5%]">
                              
                                            <Link href={`/category/${itemChild.slug}`} className="block text-center">
                                                    <div className='aspect-square w-full overflow-hidden rounded-lg bg-[#f6f0e8]'>
                                                        <Image
                                                            loading="lazy"
                                                            src={`${BASE_URL}/public/${itemChild?.icon}`}
                                                            width={204}
                                                            height={204}
                                                            alt={itemChild.name}
                                                            className='h-full w-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                                                        />

                                                </div>
                                                <h3 className="mt-1 line-clamp-1 text-[10px] font-bold uppercase text-neutral-black md:text-sm">
                                                    {itemChild.name}
                                                </h3>
                                            </Link>
                                  
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
    )
}
