
import React, { useState } from 'react';
import EditAddressForm from '@/app/ui/Address/EditAddressForm';
import { API_BASE_URL } from '@/app/config/api';

async function getAddressEdit(id: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/user/shipping/address_edit/${id}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        return [];
    }
    const data: any = await response.json();
    return data as any;
}



export default async function page({ params }: any) {
    const result = await getAddressEdit(params.id);
    const data = result.data[0]
    return (
        <div className="profile-form w-96 mx-auto shadow-lg border p-4 ">
            <EditAddressForm id={params.id} data={data} />
        </div>
    )
}

