import React from 'react'

export default function TitleLoginHeading({ title = "Login with" }: any) {

    return <div className='login_header flex items-center justify-center pb-3 border-b-[2px] border-neutral-black '>
        <h3 className='text-2xl text-neutral-black font-semibold' >{title}</h3>
    </div>

}
