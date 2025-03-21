export interface Review {
    id: string;
    movie_id: number;
    name: string;
    lastname: string;
    rating: number;
    comment: string;
    created_at: string;
  }
  
  export interface NewReview {
    movie_id: number;
    name: string;
    lastname: string;
    rating: number;
    comment: string;
}   