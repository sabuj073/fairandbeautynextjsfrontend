"use client"

import { cookieStore } from "@/lib/hooks/useCookieStore";
export default function ViewAll() {

    const { heading_title_value } = cookieStore();
    const view_all = heading_title_value?.view_all
    return (
        <div className="flex justify-center gap-2 items-center">{view_all} <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_54830_1240)">
<path d="M11.5 5L14 7.5M14 7.5L11.5 10M14 7.5H0" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_54830_1240">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
    )
}
