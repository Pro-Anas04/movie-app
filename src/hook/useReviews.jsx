import { useState, useEffect } from 'react';
import { supabase } from '../supabase/index.js';

export const useReviews = (movieId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avgRating, setAvgRating] = useState(0);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('movie_id', movieId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data);
      
      // คำนวณคะแนนเฉลี่ย
      if (data.length > 0) {
        const sum = data.reduce((acc, review) => acc + review.rating, 0);
        setAvgRating(sum / data.length);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
    
    // อัพเดทคะแนนเฉลี่ย
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0) + newReview.rating;
    setAvgRating(sum / (reviews.length + 1));
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  return { reviews, loading, error, avgRating, fetchReviews, addReview };
};

export default useReviews;