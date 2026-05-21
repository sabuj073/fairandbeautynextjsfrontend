"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "../Pagination/Pagination";

export default function PaginationFilter({ meta }: any) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString()); // Create a mutable copy
        if (page) {
            params.set("page", page.toString());
        } else {
            params.delete("page");
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="pt-8 pb-8">
            {meta && <Pagination meta={meta} onPageChange={handlePageChange} />}
        </div>
    );
}
