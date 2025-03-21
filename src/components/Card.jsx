import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useReviews from '../hook/useReviews';

function Card({data,trnding,index,media_type}) {
    const imageURL = useSelector(state => state.movieoData.imageURL)
    const mediaType =data.media_type ?? media_type

    function RatingDisplay({ itemId }) {
            const { avgRating } = useReviews(itemId);
    
            return (
                <p className='flex justify-center items-center gap-1'>
                    Rating : {avgRating ? avgRating.toFixed(1) : '0.0'}
                </p>
            );
        }

  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'>
        
        {
            data?.poster_path ? (
                <img 
                    src={imageURL+data?.poster_path} 
                />
            ) : (
                <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                    No image found
                </div>
            )
        }
    
        <div className='absolute top-4'>
            {
                trnding && (
                    <div className='py-1 px-4  backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
                        #{index} Trending
                    </div>
                )
            }
        </div>

        <div className='absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/60 p-2'>
            <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
            <div className='text-sm text-neutral-400 flex justify-between items-center'>
                <p>{moment(data.release_date).format('MMMM Do YYYY')}</p>
                <p className='bg-black px-1 rounded-full text-xs text-white flex gap-1'><FaStar className='text-amber-400'/><RatingDisplay itemId={data.id} /></p>
            </div>
        </div>
    </Link>
  )
}

export default Card