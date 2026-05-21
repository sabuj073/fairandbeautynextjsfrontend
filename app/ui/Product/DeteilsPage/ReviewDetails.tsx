"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { VerifiedBlueIcon } from "../../Icons/Icons";
import ReviewStar from "./ReviewStar";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Pagination from "./Pagination";
import { API_BASE_URL } from "@/app/config/api";
import CustomImage from "../../CustomImage/CustomImage";
import AddReview from "../AddReview/AddReview";
import { cookieStore } from "@/lib/hooks/useCookieStore";

interface Review {
  id: number;
  user_id: number;
  user_name: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  created_at: string;
  recommended?: boolean | number;
}

interface ReviewDetailsProps {
  productId: number;
  productRating?: number;
  ratingCount?: number;
}

export default function ReviewDetails({ productId, productRating = 0, ratingCount = 0 }: ReviewDetailsProps) {
  const cookieValue = cookieStore((state) => state.cookieValue);
  const isLoggedIn = !!cookieValue?.user?.id;
  const userId = cookieValue?.user?.id;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(productRating);
  const [totalReviews, setTotalReviews] = useState(ratingCount);
  const [canReview, setCanReview] = useState<boolean | null>(null);
  const [loadingCanReview, setLoadingCanReview] = useState(true);

  // Check if logged-in user has purchased this product (can review)
  useEffect(() => {
    if (!productId) {
      setLoadingCanReview(false);
      setCanReview(false);
      return;
    }
    if (!isLoggedIn) {
      setCanReview(false);
      setLoadingCanReview(false);
      return;
    }
    const check = async () => {
      setLoadingCanReview(true);
      try {
        const res = await fetch(`/api/can-review-product?product_id=${productId}&user_id=${userId}`);
        const data = await res.json();
        setCanReview(!!data.can_review);
      } catch {
        setCanReview(false);
      } finally {
        setLoadingCanReview(false);
      }
    };
    check();
  }, [productId, userId, isLoggedIn]);

  useEffect(() => {
    const fetchReviews = async () => {
      // Ensure productId is a number
      const prodId = Number(productId);
      if (!prodId || isNaN(prodId)) {
        console.error('Invalid productId:', productId);
        setLoading(false);
        return;
      }

      try {
        // Use Next.js API route to avoid CORS issues
        const url = `/api/products/${prodId}/reviews`;
        console.log('Fetching reviews from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Reviews API Response for product', prodId, ':', data);
        console.log('Response status:', response.status);
        console.log('Data keys:', Object.keys(data));
        console.log('Data.success:', data.success);
        console.log('Data.data:', data.data);
        console.log('Data.data type:', Array.isArray(data.data) ? 'array' : typeof data.data);
        
        if (data.success && data.data) {
          // ReviewCollection returns { data: [...], success: true, status: 200 }
          const reviewsData = Array.isArray(data.data) ? data.data : [];
          console.log('Parsed reviews data:', reviewsData);
          console.log('Reviews count:', reviewsData.length);
          console.log('Setting reviews state with:', reviewsData);
          
          setReviews(reviewsData);
          
          // Force a re-render by logging state
          console.log('State updated - reviews should now be:', reviewsData);
          
          // Calculate average rating from reviews
          if (reviewsData.length > 0) {
            const avg = reviewsData.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviewsData.length;
            setAverageRating(parseFloat(avg.toFixed(1)));
            setTotalReviews(reviewsData.length);
          } else {
            // If API returns empty array but we have props, use props
            setAverageRating(productRating);
            setTotalReviews(ratingCount);
          }
        } else {
          console.log('No reviews data or API error:', data);
          // Use props if API fails
          setAverageRating(productRating);
          setTotalReviews(ratingCount);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Use props if API fails
        setAverageRating(productRating);
        setTotalReviews(ratingCount);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, productRating, ratingCount]);

  return (
    <div style={{border: "1px solid #AAAAAA"}} className="mt-8 px-3 md:mx-2 py-2 rounded-lg">
      <h1 className="text-base font-semibold mb-3">
        Review & Ratings
      </h1>
      <div className="rounded-lg px-3 py-4" style={{backgroundColor: "#FF3B301A", border: "1px solid #FF3B30"}}>
        <div>
          <div className="flex justify-between items-center">
            <p className="">
              <span className="text-4xl font-semibold">{averageRating.toFixed(1)}</span>{" "}
              <span className="ms-6 text-base font-medium">out of 5.00</span>
            </p>
            <div className="flex flex-col items-end">
              <ReviewStar rating={averageRating} />
              <p className="text-sm font-normal">({totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'})</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {loadingCanReview ? (
              <span className="text-sm text-gray-500">Checking...</span>
            ) : canReview ? (
              <button 
                onClick={() => {
                  const reviewSection = document.getElementById('review-form-section');
                  if (reviewSection) {
                    reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{background: "linear-gradient(90deg, #FD1B57 0%, #BA133F 100%)"}} 
                className="text-base font-semibold px-3 py-2 rounded-md text-white cursor-pointer"
              >
                Review This Product
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mt-5 text-center">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        reviews.slice(0, 5).map((review) => (
          <React.Fragment key={review.id}>
            <div className="flex justify-between items-start mt-5">
              <div>
                <h1 className="text-sm font-semibold">
                  {review.user_name || 'Anonymous'}
                </h1>
                <span className="text-sm font-normal">{review.created_at}</span>
                <ReviewStar rating={review.rating} />
              </div>
              {(review.recommended === 1 || review.recommended === true || review.recommended) && (
                <div className="flex items-center gap-1">
                  <VerifiedBlueIcon />
                  <span className="text-sm font-semibold bg-gradient-to-b from-[#0064E1] to-[#26B7FF] bg-clip-text text-transparent">
                    Verified Purchase
                  </span>
                </div>
              )}
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold mb-2">{review.title}</p>
              <p className="text-sm font-normal">{review.comment}</p>
              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {review.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <CustomImage
                        src={img}
                        width={64}
                        height={64}
                        alt={`Review image ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="mt-5 text-center text-gray-500">No reviews yet. Be the first to review this product!</div>
      )}


      {/* Review Form Section - only logged-in users who purchased can submit */}
      <div id="review-form-section" className="mt-8 pt-6 border-t border-gray-200">
        {loadingCanReview ? (
          <p className="text-sm text-gray-500">Checking review eligibility...</p>
        ) : !isLoggedIn ? (
          <div className="rounded-lg p-4 bg-amber-50 border border-amber-200">
            <p className="text-sm font-medium text-amber-800">
              Please log in to submit a review. Only customers who have purchased this product can leave a review.
            </p>
            <Link href="/user" className="inline-block mt-2 text-sm font-semibold text-primary hover:underline">
              Log in
            </Link>
          </div>
        ) : !canReview ? (
          <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
            <p className="text-sm font-medium text-gray-700">
              You can only review products you have purchased. If you have bought this product, make sure you are logged in with the same account.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <AddReview id={productId} />
          </>
        )}
      </div>
    </div>
  );
}
