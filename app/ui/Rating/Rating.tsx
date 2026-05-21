import React from 'react';

type RatingProps = {
    rating: number; // e.g., 3.5 or 3.2
};

const StarIcon = ({ filled, halfFilled }: { filled: boolean; halfFilled?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? "#A020F0" : "none"}
        stroke={filled || halfFilled ? "#A020F0" : "#404042"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-star"
    >
        {halfFilled ? (
            <>
                <defs>
                    <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="#404042" />
                        <stop offset="50%" stopColor="none" />
                    </linearGradient>
                </defs>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#half-fill)" />
            </>
        ) : (
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        )}
    </svg>
);

const Rating: React.FC<RatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(fullStars)].map((_, index) => (
                <StarIcon key={index} filled={true} />
            ))}
            {halfStars === 1 && (
                <StarIcon halfFilled={true} filled={false} />
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <StarIcon key={index} filled={false} />
            ))}
        </div>
    );
};

export default Rating;
