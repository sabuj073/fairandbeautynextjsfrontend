"use client"
import { Button } from '@/app/ui/button'
import React, { useState } from 'react'
import AddReview from '../../AddReview/AddReview'

export default function WriteReviewSection({ id }: any) {
  const [openShow, setOpenShow] = useState(false)
  return (
    <>
      <div className="review_header flex items-center justify-between ">
        <h3 className='text-[20px] text-neutral-black font-semibold ' >Customer  Reviews</h3>
        <Button onClick={() => setOpenShow(!openShow)} className='px-[20px] justify-center md:px-[72px] ' >Write a review</Button>
      </div>
      {
        openShow &&
        <AddReview id={id} />
      }</>

  )
}
