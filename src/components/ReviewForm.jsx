import { useState } from 'react';
import { supabase } from '../supabase/index.js';
import StarRating from './StarRating.jsx';

const ReviewForm = ({ movieId, onReviewSubmitted }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!name || !email || !rating || !comment) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
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
            email,
            rating,
            comment,
          },
        ])
        .select();

      if (error) throw error;

      // รีเซ็ตฟอร์ม
      setName('');
      setEmail('');
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
      <h3 className="text-xl font-bold text-white mb-4">เขียนรีวิว</h3>
      
      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">ชื่อ</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white rounded p-2"
              placeholder="ชื่อของคุณ"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white rounded p-2"
              placeholder="อีเมลของคุณ"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">คะแนน</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">ความคิดเห็น</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-gray-700 text-white rounded p-2 min-h-[100px]"
            placeholder="แสดงความคิดเห็นเกี่ยวกับหนังเรื่องนี้"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'ส่งรีวิว'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;