"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import React from 'react'
import Heading from '../Section/Heading';

export default function InHeadeing() {
    const { heading_title_value } = cookieStore();
    const ingredints = heading_title_value?.ingredints
    const shop_by = heading_title_value?.shop_by
    return (
        <Heading title={shop_by} sub_title={ingredints} />
    )
}
