import { cn } from '@/lib/utils';
import React from 'react'
type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Container({ children, className }: Props) {
    return <div className={cn("container mx-auto px-0 overflow-x-hidden max-w-full", className)}>
        {children}
    </div>
}

