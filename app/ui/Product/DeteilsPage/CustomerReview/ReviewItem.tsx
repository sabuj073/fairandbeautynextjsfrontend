"use client";
import { useState, useEffect } from 'react';
import { ApiResponse, Review } from '@/types/api';
import CustomImage from '@/app/ui/CustomImage/CustomImage';
import { CustomButton } from '@/app/ui/CustomLink';
import { LikeIcon, UnLikeIcon, VerifiedIcon } from '@/app/ui/Icons/Icons';
import StarRating from '@/app/ui/StarRating/StarRating';
import { API_BASE_URL } from '@/app/config/api';
import { fetchReviews } from '@/lib/apiData';
import { ReviewSkeleton } from '@/app/ui/skeletons';

export default function ReviewItem({ id, slug }: { id: number; slug: string }) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false); // State for skeleton loading
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(false); // New state for initial load

    useEffect(() => {
        fetchReviewsData();
    }, []);

    const fetchReviewsData = async (url: string = `${API_BASE_URL}/reviews/product/${id}?page=1`) => {
        setLoading(true);
        try {
            const response: any = await fetchReviews(url);
            setReviews(prevReviews => [...prevReviews, ...response.data]);
            setNextPageUrl(response.links.next);
            setHasMore(!!response.links.next);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        } finally {
            setLoading(false);
            setLoadingInitial(false);
            setLoadingSkeleton(false); // Stop skeleton loading
        }
    };

    const handleLoadMore = () => {
        if (!loading && nextPageUrl) {
            setLoadingSkeleton(true); // Start showing skeleton when loading more
            fetchReviewsData(nextPageUrl);
        }
    };

    return (
        <div className="review_inner pb-[20px] flex flex-col gap-[20px]">
            {loadingInitial ? (
                <ReviewSkeleton />

            ) : (
                <>
                    {reviews.map((item, index) => (
                        <div className="review_content_area" key={index + 909}>
                            <div className="flex items-start gap-3 md:gap-6 w-full flex-wrap md:flex-nowrap ">
                                {item.recommended === 1 && (
                                    <div className="flex items-center md:basis-[20%] gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                            <path d="M5.59 10.58L1.42 6.41L0 7.82L5.59 13.41L17.59 1.41L16.18 0L5.59 10.58Z" fill="#303030" />
                                        </svg>
                                        <span>I recommended this product</span>
                                    </div>
                                )}
                                <div className="product_review_content flex flex-col gap-1 md:gap-[15px]">
                                    <StarRating width={20} height={20} rating={item.rating} className="!justify-start" />
                                    <h3 className="customer_name text-neutral-black text-[20px] md:text-2xl">{item.title}</h3>
                                    <div className="des text-neutral-black text-base">{item.comment}</div>
                                    <div className="review_image flex flex-wrap items-center gap-[18px]">
                                        {item.images.map((review: any, index: any) => (
                                            <div className="w-[100px] h-[100px]" key={index}>
                                                <CustomImage
                                                    src={review}
                                                    width={100}
                                                    height={100}
                                                    alt="Review"
                                                    className="object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="date_area flex items-center gap-5">
                                        <div className="date text-neutral-black text-base">{item.created_at}</div>
                                        <div className="like flex items-center gap-1">
                                            <LikeIcon />
                                            <span className="text-neutral-black text-base">{item.review_like}</span>
                                        </div>
                                        <div className="like flex items-center gap-1">
                                            <UnLikeIcon />
                                            <span className="text-neutral-black text-base">{item.review_dislike}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="verified_review flex items-center justify-between">
                                <h4 className="text-base text-neutral-black">{item.user_name}</h4>
                                {item.status && (
                                    <div className="flex items-center gap-1">
                                        <VerifiedIcon /> Verified
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {loadingSkeleton && (
                        <ReviewSkeleton />
                    )}
                </>
            )}

            {hasMore && !loadingInitial && (
                <div className="load_more flex justify-center items-center mt-4">
                    <CustomButton
                        onClick={handleLoadMore}
                        disabled={loadingSkeleton}
                        className="inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[72px] border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out hover:bg-primary-hover hover:text-white uppercase text-[12px]"
                    >
                        {loadingSkeleton ? 'Loading Reviews...' : 'View All Reviews'}
                    </CustomButton>
                </div>
            )}
        </div>
    );
}
