import StarRating from './StarRating.jsx';

const AverageRating = ({ rating, count }) => {
  return (
    <div className="flex items-center mb-4">
      <StarRating rating={rating} readOnly size="lg" />
      <span className="ml-2 text-white text-lg">
        {rating.toFixed(1)} ({count} {count === 1 ? 'review' : 'review'})
      </span>
    </div>
  );
};

export default AverageRating;