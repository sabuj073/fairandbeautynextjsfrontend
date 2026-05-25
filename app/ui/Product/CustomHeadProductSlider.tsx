'use client';
import { useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductItem from '@/app/ui/Product/ProductItem';
import CustomLink from '@/app/ui/CustomLink';
import clsx from 'clsx';
import { Product } from '@/types/api';
import ViewAll from './ViewAll/ViewAll';
import CustomTranslateHeading from '../CustomTranslateHeading';
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


const RENDER_BUFFER = 2;

// Skeleton loader component
const ProductItemSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4 h-[300px] flex flex-col">
        <div className="bg-gray-300 h-40 rounded-md mb-3"></div>
        <div className="bg-gray-300 h-4 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 rounded w-3/4 mb-3"></div>
        <div className="bg-gray-300 h-6 rounded w-1/2 mt-auto"></div>
    </div>
);

export default function CustomHeadProductSlider({
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
    const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set());
    const [isHomepage, setIsHomepage] = useState(false);

    const pathName = usePathname();

    
    useEffect(() => {
        const updateVisibleSlides = () => {
            if (window.innerWidth < 768) {
                setVisibleSlides(2);
            } else if (window.innerWidth < 1024) {
                setVisibleSlides(3);
            } else {
                setVisibleSlides(4);
            }
        };

        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, []);

    // Handle carousel events to track current slide
    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            const newIndex = api.selectedScrollSnap();
            setCurrentSlide(newIndex);
            
            // Mark this slide and nearby slides as loaded
            const newLoaded = new Set(loadedIndexes);
            const start = Math.max(0, newIndex - RENDER_BUFFER);
            const end = Math.min(products.length - 1, newIndex + visibleSlides + RENDER_BUFFER - 1);
            
            for (let i = start; i <= end; i++) {
                newLoaded.add(i);
            }
            
            setLoadedIndexes(newLoaded);
        };

        api.on('select', onSelect);
        onSelect();

        return () => {
            api.off('select', onSelect);
        };
    }, [api, products.length, visibleSlides]);

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
                <div className='sm:hidden block'>
                    <CustomTranslateHeading title={title} translateKey={translateKey} />
                </div>
                <div className="sm:flex hidden section_heading text-center items-center justify-between">
                    <h2 className={clsx('ml-2 relative text-[18px] sm:text-[28px] xl:text-[32px] text-neutral-black max-w-max font-semibold uppercase gap-1 flex items-center justify-start flex-wrap')}>
                        <div className={clsx('text-neutral-black relative', className)}>{title}</div>
                    </h2>
                    {view_all_button && (
                        <div className="view_all flex justify-center items-center">
                            <CustomLink href={view_link} className="text-neutral-black mr-2">
                                <ViewAll />
                            </CustomLink>
                        </div>
                    )}
                </div>
                
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
                            const isLoaded = loadedIndexes.has(index);
                            
                            return (
                                <CarouselItem 
                                    key={index} 
                                    className="pl-1 md:pl-2 basis-[50%] md:basis-[40%] lg:basis-1/3 xl:basis-1/4"
                                >
                                    <div className={clsx(
                                        "min-w-0 w-full transition-opacity duration-300", 
                                        isLoaded ? "opacity-100" : "opacity-0"
                                    )}>
                                        {shouldRender ? (
                                            <ProductItem {...product} />
                                        ) : isLoaded ? (
                                            <ProductItemSkeleton />
                                        ) : (
                                            <div className="h-[300px]"></div>
                                        )}
                                    </div>
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
                    <div className="sm:hidden view_all flex justify-center items-center">
                        <CustomLink href={view_link} className="text-neutral-black">
                            <ViewAll />
                        </CustomLink>
                    </div>
                )}
            </div>
        </div>
    );
}
