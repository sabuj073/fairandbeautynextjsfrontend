import { cn } from '@/lib/utils';
import React, { FC, InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string; // Optional className prop to customize styles
}

const CustomInput: FC<CustomInputProps> = ({ className, ...rest }) => {
    return (
        <div>
            <input
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...rest}
            />
        </div>
    );
}

export default CustomInput;
