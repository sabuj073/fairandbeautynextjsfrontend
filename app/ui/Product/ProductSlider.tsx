'use client';
import { useState, useEffect, useCallback } from 'react';
import Heading from '@/app/ui/Section/Heading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductItem from '@/app/ui/Product/ProductItem';
import CustomLink from '@/app/ui/CustomLink';
import clsx from 'clsx';
import { Product } from '@/types/api';
import ViewAll from './ViewAll/ViewAll';
import TranslateHeading from '../TranslateHeading';
import { usePathname } from 'next/navigation';

type Props = {
    children?: React.ReactNode;
    products?: Product[];
    title?: string;
    sub_title?: string;
    view_link?: string;
    className?: string;
    ContainerClassName?: string;
    translateKey?: string;
    view_all_button?: boolean;
    slide_button?: boolean;
};

// Number of slides to pre-render on each side of visible slides
const RENDER_BUFFER = 2;

export default function ProductSlider({
    products = [],
    view_link = "/",
    title = "",
    sub_title = "",
    className,
    ContainerClassName,
    translateKey,
    view_all_button = true,
    slide_button = true
}: Props) {
    const [api, setApi] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(4);
    const [isHomepage, setIsHomepage] = useState(false);

    const pathName = usePathname();

    useEffect(() => {
        const updateVisibleSlides = () => {
            if (window.innerWidth < 768) {
                setVisibleSlides(2); // Mobile
            } else if (window.innerWidth < 1024) {
                setVisibleSlides(3); // Tablet
            } else {
                setVisibleSlides(4); // Desktop
            }
        };

        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrentSlide(api.selectedScrollSnap());
        };

        api.on('select', onSelect);
        onSelect();

        return () => {
            api.off('select', onSelect);
        };
    }, [api]);

    const getVisibleRange = useCallback(() => {
        const start = Math.max(0, currentSlide - RENDER_BUFFER);
        const end = Math.min(products.length - 1, currentSlide + visibleSlides + RENDER_BUFFER - 1);
        return { start, end };
    }, [currentSlide, products.length, visibleSlides]);

    const { start, end } = getVisibleRange();

    useEffect(() => {
        if(String(pathName).length === 1){
            setIsHomepage(true);
        }else{
            setIsHomepage(false);
        }
    }, [pathName])

    return (
        <div className={clsx("home-section", ContainerClassName)}>
            <div className={clsx(`arrival_section bg-[#DFE8DE] mx-0 rounded-lg flex flex-col gap-[15px] sm:gap-6 py-[20px] md:py-[37px] md:px-[10px] sm:px-4`, className)}>
                <TranslateHeading translateKey={translateKey} />
                <div>
                    <Carousel
                    opts={{
                        align: 'center',
                    }}
                    setApi={setApi}
                    className="w-full"
                >
                    <CarouselContent className='ml-0'>
                        {products.map((product, index) => {
                            const shouldRender = index >= start && index <= end;
                            
                            return (
                                <CarouselItem 
                                    key={index} 
                                    className="pl-1 md:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                                >
                                    {shouldRender ? (
                                        <div className="min-w-0 w-full">
                                            <ProductItem {...product} />
                                        </div>
                                    ) : (
                                        <div className="h-[300px] w-full"></div>
                                    )}
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    {slide_button && (
                        <>
                            <CarouselPrevious className="left-[0px] sm:left-[-17px]" />
                            <CarouselNext className="right-[-0px] sm:right-[-17px]" />
                        </>
                    )}
                </Carousel>
                </div>
                {view_all_button && (
                    <div className="view_all flex justify-center items-center">
                        <CustomLink href={view_link ?? "/"} className="text-neutral-black">
                            <ViewAll />
                        </CustomLink>
                    </div>
                )}
            </div>
        </div>
    );
}
