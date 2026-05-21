"use client"
import { Button } from '@/app/ui/button';
import { cookieStore } from '@/lib/hooks/useCookieStore';
export default function AddToLook({ ...rest }: any) {
    const { heading_title_value } = cookieStore();
    const add_look_to_cart = heading_title_value?.add_look_to_cart
    return (
        <Button {...rest} className="  w-full text-center font-normal justify-center rounded-[25px] py-[6px] sm:py-[10px] !text-[12px] uppercase bg-green-800"
        >
            {add_look_to_cart}
        </Button>
    )
}
