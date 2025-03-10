import { createClient } from '@supabase/supabase-js';

// ตั้งค่า Environment Variables ใน .env หรือ .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// สร้าง Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// ฟังก์ชันสำหรับดึงข้อมูลรีวิวทั้งหมดของหนังเรื่องหนึ่ง
export async function getMovieReviews(movieId) {
  const { data, error } = await supabase
    .from('movie_reviews')
    .select('*, profiles(username, avatar_url)')
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// ฟังก์ชันสำหรับดึงรีวิวของผู้ใช้สำหรับหนังเรื่องหนึ่ง
export async function getUserReview(movieId, userId) {
  const { data, error } = await supabase
    .from('movie_reviews')
    .select('*')
    .eq('movie_id', movieId)
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data;
}

// ฟังก์ชันสำหรับเพิ่มหรืออัปเดตรีวิว
export async function upsertReview(reviewData) {
  const { data, error } = await supabase
    .from('movie_reviews')
    .upsert(reviewData, { onConflict: 'movie_id,user_id' })
    .select();
  
  if (error) throw error;
  return data;
}

// ฟังก์ชันสำหรับลบรีวิว
export async function deleteReview(reviewId) {
  const { error } = await supabase
    .from('movie_reviews')
    .delete()
    .eq('id', reviewId);
  
  if (error) throw error;
  return true;
}