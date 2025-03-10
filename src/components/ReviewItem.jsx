import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import StarRating from './StarRating.jsx';

const ReviewItem = ({ review }) => {
  const formattedDate = formatDistanceToNow(new Date(review.created_at), {
    addSuffix: true,
    locale: th
  });

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-lg font-semibold text-white">{review.name}</h4>
          <StarRating rating={review.rating} readOnly />
        </div>
        <span className="text-gray-400 text-sm">{formattedDate}</span>
      </div>
      
      <p className="text-gray-300">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;