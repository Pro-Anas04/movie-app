import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import { setBannerData,setImageURL } from './store/moviepSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  // const [count, setCount] = useState(0)
  const fetchTrendingData = async() => {
    try {
      const response = await axios.get('/trending/all/week')

      dispatch(setBannerData(response.data.results))
      
    } catch (error) {
      console.log("error",error)
    }
  }

  const fetchConfiguration = async() => {
    try {
      const response = await axios.get("/configuration")

      dispatch(setImageURL(response.data.images.secure_base_url+"original"))

    } catch (error) {
      
    }
  }

  useEffect (() => {
    fetchTrendingData()
    fetchConfiguration()
  }, [])


  return (
    <main className='pd-14 lg:pb-0'>
      <Header/>
      <div className='min-h-[90vh]'>
        <Outlet/>
      </div> 
      <Footer/>
      <MobileNavigation/>
    </main>
  )
}

export default App
