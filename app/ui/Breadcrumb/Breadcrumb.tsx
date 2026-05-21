import React from 'react'
import Link from 'next/link'

export default function Breadcrumb({ link = '/', name = '' }) {
    const dataArray = [
        {
            link: '/',
            name: 'Home'
        },
        {
            link: link,
            name: ' / ' + name
        },
    ]
    return (
        <div className='breadcrumb md:py-0 py-[20px] md:px-4 mx-4 md:mx-0'>
            {
                dataArray.map((item, index) => (<Link key={index} href={item.link}>{item.name}</Link>))
            }

        </div>
    )
}