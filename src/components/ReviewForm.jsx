import { useState } from 'react';
import { supabase } from '../supabase/index.js';
import StarRating from './StarRating.jsx';

const ReviewForm = ({ movieId, onReviewSubmitted }) => {
  const [name, setName] = useState('');
  const [lastname, setlastname] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!name || !lastname || !rating || !comment) {
      setError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            movie_id: movieId,
            name,
            lastname,
            rating,
            comment,
          },
        ])
        .select();

      if (error) throw error;

      // รีเซ็ตฟอร์ม
      setName('');
      setlastname('');
      setRating(0);
      setComment('');
      
      // แจ้ง component หลักว่ามีรีวิวใหม่
      if (onReviewSubmitted) onReviewSubmitted(data[0]);
      
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการบันทึกรีวิว: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-white mb-4">Write a review</h3>
      
      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded p-2"
              placeholder="Your Fisrt Name"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Last Name</label>
            <input
              type="lastname"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              className="w-full bg-gray-700 text-white rounded p-2"
              placeholder="Your Last Name"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-gray-700 text-white rounded p-2 min-h-[100px]"
            placeholder="Comment on this movie"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Recording...' : 'Submit a review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;