'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
export default function BlogSearch({ currentPage }: any) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (currentPage) {
            params.set('page', currentPage);
        }
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 1000);

    return (
        <div className="search_input flex items-center relative w-full md:w-[750px]   ">
            <input
                type="text"
                placeholder="Blog search"
                className="w-[730px] border-[1px] p-[10px] border-gray rounded-r-[0] rounded-lg shadow-none focus:shadow-none focus:outline-none ring-0"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />

            <Button className="search_icon absolute !bg-[#CC0F99] right-[-30px] top-0 h-[46px] w-[50px] bg-primary  rounded-lg rounded-l-[0]">
                <Search className="text-white" />
            </Button>
        </div>
    )
}
