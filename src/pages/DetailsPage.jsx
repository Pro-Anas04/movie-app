import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch';
import useFetchDetails from '../hook/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScollCard from '../components/HorizontalScollCard';
import VideoPlay from '../components/VideoPlay';
import useReviews from '../hook/useReviews';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';

function DetailsPage() {
  const params = useParams()
  const imageURL = useSelector(state => state.movieoData.imageURL)
  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const {data :casData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const {data :similarData} = useFetch (`/${params?.explore}/${params?.id}/similar`)
  const {data :recommendationData} = useFetch (`/${params?.explore}/${params?.id}/recommendations`)
  const [ playVideo,setPlayVideo] = useState(false)
  const [playVideoId,setPlayVideoId] = useState("")

  const { reviews, loading: reviewsLoading, error: reviewsError, avgRating, addReview } = useReviews(params?.id);

  console.log('data',data)
  console.log('star',casData)

  const handlePlayVideo = () => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  const duration = (data?.runtime/60)?.toFixed(1).split(".")
  const writer = casData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")

  return (
    <div>
      
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img 
            src={imageURL+data?.backdrop_path}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img 
              src={imageURL+data?.poster_path}
              className='h-80 w-60 object-cover rounded'
            />
            <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 text-center  bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-amber-500 hover:scale-105 transition-all'>Play Now</button>
        </div>

        <div>

          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider/>

          <div className='flex items-center gap-3'>
            <p>
              Rating : {avgRating.toFixed(1)}
            </p>
            <span>|</span>
            <p>
              View : {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider/>

          <div>
            <h3 className='text-2xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider/>
            
            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p>
                Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>
                Revenue : {Number(data?.revenue)}
              </p>
            </div>
            <Divider/>
          </div>

          <div>
            <p><span className='text-white'>Director</span> : {casData?.crew[0]?.name}</p>
            <Divider/>
            <p>
              <span className='text-white'>Writer : {writer}</span>
            </p>
          </div>

          <Divider/>
          <h2 className='font-bold text-lg'>Cast :</h2>
          <div className='flex gap-5 overflow-x-auto'>
            {
              casData?.cast?.filter(el => el?.profile_path)?.slice(0, 10).map((cast,index) => {
                return(
                  <div  key={index} className="w-[96px] flex-shrink-0">
                    <div>
                      <img 
                        src={imageURL+cast?.profile_path} 
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{cast?.name}</p>
                  </div>
                )
              })
            }
          </div>

            {/* เพิ่มส่วนนี้ก่อนถึงส่วน Similar และ Recommendation */}
            <div className="container mx-auto px-3 py-8">
              <h2 className="text-2xl font-bold text-white mb-6">Reviews and Ratings</h2>
              
              {/* แสดงคะแนนเฉลี่ย */}
              <div className="mb-6 flex items-center">
                <div className="bg-gradient-to-r from-red-500 to-amber-500 text-white text-xl font-bold px-4 py-2 rounded-lg flex items-center">
                  <span className="text-2xl mr-1">{avgRating.toFixed(1)}</span>
                  <span className="text-sm">/5</span>
                </div>
                <div className="ml-4">
                  <StarRating rating={avgRating} readOnly size="lg" />
                  <p className="text-neutral-400 mt-1">จาก {reviews.length} {reviews.length === 1 ? 'review' : 'review'}</p>
                </div>
              </div>
              
              {/* ฟอร์มรีวิว */}
              <div className="mb-10">
                <ReviewForm movieId={params?.id} onReviewSubmitted={addReview} />
              </div>
              
              {/* รายการรีวิว */}
              <ReviewList reviews={reviews} loading={reviewsLoading} error={reviewsError} />
            </div>

        </div>
      </div>

      <div>
        <HorizontalScollCard data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore}/>
        <HorizontalScollCard data={recommendationData} heading={"Recommendation "+params?.explore} media_type={params?.explore}/>
      </div>

      {
        playVideo && (
          <VideoPlay data={playVideoId} close={()=> setPlayVideo(false)} media_type={params?.explore}/>
        )
      }
    </div>
  )
}

export default DetailsPage