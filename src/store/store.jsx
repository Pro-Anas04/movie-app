import { configureStore } from '@reduxjs/toolkit'
import movieoReducer from './moviepSlice'

export const store = configureStore({
  reducer: {
    movieoData : movieoReducer
  },
})
