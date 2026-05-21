"use client"
import Image from 'next/image'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, } from '@/components/ui/carousel'
import { BASE_URL } from '@/app/config/api'
import Link from 'next/link'
import Heading from '../../Section/Heading'
export default function ShopByBrand({title,data}:any) {
    return (
      
            <div className='shop_by_section mt-9 lg:mt-20' >
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
                            <CarouselItem key={index} className="ml-2 pl-2 lg:pl-2 basis-1/3 sm:basis-1/4 md:basis-1/4 xl:basis-1/4 2xl:basis-1/5  ">
                              
                                            <Link href={`/category/${itemChild.slug}`} >
                                                    <div className='w-[120px] h-[144px] md:w-[180px] md:h-[216px] lg:w-[240px] lg:h-[288px] xl:w-[280px] xl:h-[340px]  '>
                                                        <Image
                                                            loading="lazy"
                                                            src={`${BASE_URL}/public/${itemChild?.icon}`}
                                                            width={280}
                                                            height={340}
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
