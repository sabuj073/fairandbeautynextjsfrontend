import { API_BASE_URL } from '@/app/config/api';
import Dropdown from '@/app/ui/Address/Dropdown'
import { auth } from '@/auth';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import React from 'react'

async function getAddressList(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/user/shipping/address/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}


export default async function Page() {
    const token: any = await auth()
    const result = await getAddressList(token?.user?.id);

    return (
        <div className='grid grid-cols-12 gap-2 items-center '>

            {
                result?.data?.map((item: any) => (


                    <div className="col-span-12 lg:col-span-5" key={item.id} >
                        <div className="border p-3 pr-5 rounded mb-3 relative">
                            <div>
                                <span className="w-1/2 font-semibold">Address:</span>
                                <span className="ml-2">{item?.address}</span>
                            </div>
                            <div>
                                <span className="w-1/2 font-semibold">Postal code:</span>
                                <span className="ml-2">{item?.postal_code}</span>
                            </div>
                            <div>
                                <span className="w-1/2 font-semibold">City:</span>
                                <span className="ml-2">{item?.city_name}</span>
                            </div>
                            <div>
                                <span className="w-1/2 font-semibold">State:</span>
                                <span className="ml-2">{item?.postal_code}</span>
                            </div>
                            <div>
                                <span className="w-1/2 font-semibold">Country:</span>
                                <span className="ml-2">{item?.country_name}</span>
                            </div>
                            <div>
                                <span className="w-1/2 font-semibold">Phone:</span>
                                <span className="ml-2">{item?.phone}</span>
                            </div>
                            {
                                item?.set_default && <div className="absolute right-0 bottom-0 pr-2 pb-3">
                                    <span className="text-white inline bg-primary rounded-sm py-1 px-2 ">Default</span>
                                </div>
                            }

                            <Dropdown id={item?.id} />
                        </div>
                    </div>
                ))
            }
            <div className="col-span-12 lg:col-span-5" >

                <Link href={routes.user_address_add} >
                    <div className="border p-3 rounded mb-3 cursor-pointer text-center bg-light">

                        <div className="alpha-7"> Add New Address </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
