import { Button } from '@/app/ui/button'
import StarRating from '@/app/ui/StarRating/StarRating'
import { Progress } from '@/components/ui/progress'
import React from 'react'
import ReviewItem from './ReviewItem'
import { ProductDetails } from '@/types/api'
import AddReview from '../../AddReview/AddReview'
import WriteReviewSection from './WriteReviewSection'


export default function RatingSection({
    rating_count,
    rating_stats,
    rating,
    id,
    slugData
}: ProductDetails) {

    return (

        <div className="rating_section pt-[70px] flex flex-col gap-[20px] ">
            <WriteReviewSection id={id} />
            {/* progress start */}
            <div className="rating_progress_area flex items-center justify-between md:justify-center gap-4 md:gap-[50px] ">
                <div className="number_of_rating flex flex-col gap-[15px] ">
                    <h3 className='average_rate text-lg md:text-[32px] text-neutral-black uppercase ' >{rating}</h3>
                    <StarRating width={20} height={20} rating={rating} className='!justify-start' />

                    <h3 className='total_rate text-lg md:text-[32px] text-neutral-black lowercase ' >{rating_count} <span>reviews</span> </h3>
                </div>
                <div className="rating_progress">
                    <div className="rating_progress">
                        {
                            rating_stats.rating_progress.map((item, index) => (
                                <div key={index} className="progress_item  flex items-center gap-2 ">
                                    <span className='text-base' >{item.stars}</span>
                                    <Progress value={item.percentage} className="w-[190px] sm:w-[290px]" />
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            {/* progress end */}

            {/* review start  */}
            <ReviewItem id={id} slug={slugData} />
            {/* review end */}

        </div>

    )
}
