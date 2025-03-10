import { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, onRatingChange, readOnly = false, size = 'md' }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const stars = 5; // จำนวนดาวทั้งหมด
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const starClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <div className="flex items-center">
      {[...Array(stars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = readOnly
          ? starValue <= rating
          : starValue <= (hoverRating || rating);
          
        return (
          <button
            key={index}
            type={readOnly ? 'button' : 'button'}
            disabled={readOnly}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} mr-1`}
            onClick={() => !readOnly && onRatingChange(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          >
            <Star
              className={`${starClass} ${
                isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;