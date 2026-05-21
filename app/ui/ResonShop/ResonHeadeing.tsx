"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import React from 'react'
import Heading from '../Section/Heading';

export default function ResonHeadeing() {
    const { heading_title_value } = cookieStore();
    const reason = heading_title_value?.reason
    const reason_shop = heading_title_value?.reason_shop
    return (
        <Heading title={reason} isReason={true} sub_title={reason_shop} className1="text-["
            className="reson_affter text-white" />
    )
}
