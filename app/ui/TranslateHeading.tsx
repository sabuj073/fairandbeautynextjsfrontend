"use client"
import { cookieStore } from '@/lib/hooks/useCookieStore';
import React from 'react';
import Heading from './Section/Heading';
import { get_translate } from '@/lib/utils';

export default function TranslateHeading({ translateKey,className="" }: any) {
    const { heading_title_value } = cookieStore();
    const trending_category = heading_title_value?.[translateKey];
    const { title, subtitle } = get_translate(trending_category);

    return (
        <Heading title={title} sub_title={subtitle} className={className} />
    );
}
