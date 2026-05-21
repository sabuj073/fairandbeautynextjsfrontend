'use client'
import Script from "next/script"
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Add type declaration for gtag
declare global {
    interface Window {
        dataLayer: any[]
        gtag: (...args: any[]) => void
    }
}

// Properly type the gtag function
function gtag(...args: any[]): void {
    window.dataLayer.push(arguments)
}

interface GoogleTagManagerProps {
    id: string;
}

export default function GoogleTagManager({ id }: GoogleTagManagerProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (typeof window.gtag !== 'undefined') {
            const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`
            window.gtag('event', 'page_view', {
                page_path: url,
            })
        }
    }, [pathname, searchParams])

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${id}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}