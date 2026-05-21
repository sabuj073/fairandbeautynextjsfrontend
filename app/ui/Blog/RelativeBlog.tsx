import { API_BASE_URL, BASE_URL } from '@/app/config/api'
import Link from 'next/link'
import React from 'react'
import CustomLink from '../CustomLink'
import Image from 'next/image';

async function getRelativeBlog(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/blogs-relative/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data.data as any;
}

export default async function RelativeBlog({ category_id }: any) {
    const data = await getRelativeBlog(category_id);

    return (
        <div className='relative_blog'>
            {
                data.map((item: any) => (


                    <div className="blog_item mb-5 p-0 lg:p-4 flex flex-col flex-wrap gap-4 ">
                        <div className="thumbnail w-full h-[250px] overflow-hidden flex items-start justify-start ">
                            <Image width={250} height={220} src={`${BASE_URL}/public/${item?.banner}`} alt={item.title} className=" img_fluid w-full h-auto rounded-lg object-contain " />
                        </div>
                        <h2 className=" text-lg text-neutral-black font-semibold mt-2">
                            <Link href={`/blog/${item.slug}`} className="text-reset">
                                {item.title}
                            </Link>
                        </h2>
                        <div>
                            <span className=" text-neutral-black font-medium text-lg"> {item.created_at}</span>
                        </div>
                        <div>
                            <CustomLink href={`/blog/${item.slug}`} >Read more</CustomLink>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
