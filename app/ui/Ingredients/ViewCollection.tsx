"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import CustomLink from '../CustomLink';


export default function ViewCollection({ link }: any) {
    const { heading_title_value } = cookieStore();
    const viewCollection = heading_title_value?.viewCollection
    return (
        <CustomLink className='py-[10px] mb-3 px-[25px] bg-primary text-white capitalize ' href={link} >
            {viewCollection}
        </CustomLink>
    )
}
