import * as React from "react"
import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import CollectionSection from "./data"
import MobileNav from "./MobileNav"



export default function Navbar({
    authentic_loves,
    authentic_loves_text,
    authentic_recommends,
    authentic_recommends_text,
    authentic_fresh_drops,
    authentic_fresh_drops_text,
    authentic_brand,
    authentic_brand_text,
    brand_menu,
    languages, offerMenu, menus, translate, setting, onOpenSearchModal }: any) {
        
        // linear-gradient(180deg, #139804 0%, #063b00 100%)

    return (
        <>
            <div className="hidden lg:block sticky top-[82px] max-w-full
             z-[89999]" style={{ background: "linear-gradient(180deg, #139804 0%, #063b00 100%)"}}>
                <div className="px-2 sm:px-2 md:px-4 lg:px-6 w-full xl:px-8 flex justify-center items-center gap-4 md:gap-[35px] xl:gap-[37px] flex-wrap  ">
                    <div className="flex items-center justify-start xxl:max-w-[1510px] md:max-w-[90%] w-full md:mx-auto mx-[165px]" style={{ maxHeight: "60px" }}>
                        {/* Main Menu Categories */}
                        {
                            menus && Array.isArray(menus) && menus.length > 0 && menus.map((item: any) => (
                                <HoverCard key={item.id} openDelay={0} closeDelay={150}>
                                    <HoverCardTrigger asChild>
                                        <div className="cursor-pointer px-4 md:px-6 lg:px-8 transition-all relative nav_menu_item duration-300 ease-in-out text-white">
                                            <div className="flex flex-col transition-all hover:translate-y-[-3px]">
                                                <Link href={`/category/${item.slug}`} legacyBehavior passHref>
                                                    <span className="flex justify-center items-center gap-1 text-white text-[12px] font-[700]">
                                                        {item.name}
                                                        {item.children && Array.isArray(item.children) && item.children.length > 0 && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                                <path d="M6 9l6 6l6 -6" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </HoverCardTrigger>
                                    {item.children && Array.isArray(item.children) && item.children.length > 0 && (
                                        <HoverCardContent 
                                            className="HoverCardContent" 
                                            sideOffset={-1}
                                            align="start"
                                        >
                                            <CollectionSection children={item.children} item={item} />
                                        </HoverCardContent>
                                    )}
                                </HoverCard>
                            ))
                        }
                        <div className="flex gap-2 ms-auto">
                        {/* Blog */}
                        <div className="cursor-pointer px-2 py-[1.2rem] transition-all relative duration-300 ease-in-out text-white">
                            <div className="flex flex-col transition-all bg-[#CC0F99] px-3 py-1 rounded-[30px] hover:scale-[1.1]">
                            <Link href={`/blog`} className="uppercase text-white text-base font-normal">
                                {translate?.blog}
                            </Link>
                            </div>
                        </div>

                        {/* Buy 1 Get 1 */}
                        <div className="cursor-pointer px-2 py-[1.2rem] transition-all relative duration-300 ease-in-out text-white">
                            <div className="flex flex-col transition-all bg-[#F0A401] px-3 py-1 rounded-[30px] hover:scale-[1.1]">
                            <Link href={`/products/search?buy1get1=1`} className="uppercase text-white text-base font-normal">
                                Buy 1 Get 1
                            </Link>
                            </div>
                        </div>

                        {/* Clearance */}
                        <div className="cursor-pointer md:px-1 px-2 py-[1.2rem] transition-all relative duration-300 ease-in-out text-white">
                            <div className="flex flex-col transition-all bg-[#601390] px-3 py-1 rounded-[30px] hover:scale-[1.1]">
                            <Link href={`/products/search?clearence=1`} className="uppercase text-white text-base font-normal">
                                Clearence
                            </Link>
                            </div>
                        </div>
                        </div>

                    </div>

                </div>

            </div>

            <MobileNav
                authentic_loves={authentic_loves}
                authentic_loves_text={authentic_loves_text}
                authentic_recommends={authentic_recommends}
                authentic_recommends_text={authentic_recommends_text}
                authentic_fresh_drops={authentic_fresh_drops}
                authentic_fresh_drops_text={authentic_fresh_drops_text}
                authentic_brand={authentic_brand}
                authentic_brand_text={authentic_brand_text}
                brand_menu={brand_menu}
                languages={languages} blog={translate?.blog} offerMenu={offerMenu} menus={menus} setting={setting}
                onOpenSearchModal={onOpenSearchModal} />
        </>
    )
}


