import ReviewItem from './ReviewItem.jsx';

const ReviewList = ({ reviews, loading, error }) => {
  if (loading) return <div className="text-white text-center py-8">กำลังโหลดรีวิว...</div>;
  
  if (error) return <div className="text-red-500 text-center py-8">เกิดข้อผิดพลาด: {error}</div>;
  
  if (reviews.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        ยังไม่มีรีวิวสำหรับหนังเรื่องนี้ ให้เป็นคนแรกที่รีวิว!
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-white mb-4">รีวิวทั้งหมด ({reviews.length})</h3>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;