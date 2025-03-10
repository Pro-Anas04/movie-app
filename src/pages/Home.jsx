import React, { useEffect, useState } from "react"
import BannerHome from "../components/BannerHome"
import Card from "../components/Card"
import { useSelector } from "react-redux"
import HorizontalScollCard from "../components/HorizontalScollCard"
import axios from "axios"
import useFetch from "../hook/useFetch"


function Home() {
  const trandingData = useSelector(state => state.movieoData.bannerData)
  const {data : nowPlayingData} = useFetch('/movie/now_playing')
  const {data : topRateData} = useFetch('/movie/top_rated')
  const {data : popularShowData} = useFetch('/tv/popular')
  const {data : topRateTvData} = useFetch('/tv/top_rated')

  return (
    <div>
      <BannerHome/>
      <HorizontalScollCard data={trandingData} heading={"Trending"} trnding={true}/>
      <HorizontalScollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScollCard data={topRateData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizontalScollCard data={popularShowData} heading={"Popular Tv Shows"} media_type={"tv"}/>
      <HorizontalScollCard data={topRateTvData} heading={"Top Rated Tv"} media_type={"tv"}/>
    </div>
  )
}

export default Home