import React from 'react'

export default function FormHeader({ setActiveForm, activeForm }: any) {
    return (
        <div className="hidden lg:flex items-center justify-center mb-6 ">

            <button onClick={() => setActiveForm(0)} className={`${activeForm === 0 ? 'text-white bg-primary z-10 mr-[-20px] relative' : 'text-primary'}    text-[18px] xl:text-[18px] py-[10px] xl:py-[14px] px-[50px] xl:px-[50px] rounded-[15px] hover:bg-purple-700 hover:text-white focus:outline-none  border-[1px] border-primary  `}>
                Login
            </button>

            <button onClick={() => setActiveForm(1)} className={`${activeForm === 1 ? 'text-white bg-primary  z-10 ml-[-20px] relative' : 'bg-white  text-primary'}  text-[18px] xl:text-[18px] py-[10px] xl:py-[14px] px-[50px] xl:px-[50px] rounded-[15px] hover:bg-purple-700 hover:text-white focus:outline-none   border-[1px] border-primary  `}>
                Sign Up
            </button>
        </div>
    )
}
