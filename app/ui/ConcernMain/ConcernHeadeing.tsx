"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import React from 'react'
import Heading from '../Section/Heading';

export default function ConcernHeadeing() {
    const { heading_title_value } = cookieStore();
    const concern = heading_title_value?.concern
    const shop_by = heading_title_value?.shop_by
    return (
        <Heading title={concern} sub_title={shop_by} />
    )
}
