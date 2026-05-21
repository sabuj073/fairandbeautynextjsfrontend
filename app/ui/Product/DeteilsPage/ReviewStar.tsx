"use client";
import React from "react";
import { StartActiveIcon, StartIcon } from "../../Icons/Icons";

interface ReviewStarProps {
  rating?: number;
}

export default function ReviewStar({ rating = 0 }: ReviewStarProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={'flex items-center gap-1 '}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <StartActiveIcon width={20} height={20} key={`active-${index}`} />
      ))}
      {hasHalfStar && (
        <div className="relative" style={{ width: '20px', height: '20px' }}>
          <div className="absolute">
            <StartIcon width={20} height={20} />
          </div>
          <div style={{ width: '50%', overflow: 'hidden' }} className="absolute">
            <StartActiveIcon width={20} height={20} />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <StartIcon width={20} height={20} key={`inactive-${index}`} />
      ))}
    </div>
  );
}