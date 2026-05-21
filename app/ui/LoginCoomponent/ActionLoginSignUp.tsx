import React from 'react'
import { Button } from '@/app/ui/button';
export default function ActionLoginSignUp({ title = "", loginText = "", onClick }: any) {
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-4'>
            <div className='text-center'>{title}</div>
            <Button type='button' className='w-full justify-center items-center' onClick={onClick}>
                {loginText}
            </Button>
        </div>
    )
}
