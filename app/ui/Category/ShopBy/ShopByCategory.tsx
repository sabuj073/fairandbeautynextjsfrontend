"use client"
import Image from 'next/image'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, } from '@/components/ui/carousel'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'
import Heading from '../../Section/Heading'
export default function ShopByCategory({title,data}:any) {
    return (
      
            <div className='shop_by_section' >
                <div className='mb-4'>
                <Heading title={title}  />
                </div>
                <Carousel
                    opts={{
                        align: "center",
                        loop: false
                    }}
                    className="w-full lg:px-4"
                >
                    <CarouselContent>
                        {data.map((itemChild: any, index: any) => (
                            <CarouselItem key={index} className=" pl-4 lg:pl-4 basis-1/4 sm:basis-1/4 md:basis-1/5 xl:basis-1/5  ">
                              
                                            <Link href={`/category/${itemChild.slug}`} >
                                                    <div className='w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[204px] xl:h-[204px]  '>
                                                        <Image
                                                            loading="lazy"
                                                            src={`${BASE_URL}/public/${itemChild?.icon}`}
                                                            width={204}
                                                            height={204}
                                                            alt={itemChild.name}
                                                            className='object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110 mx-auto w-full '
                                                        />

                                                </div>
                                            </Link>
                                  
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
    )
}
