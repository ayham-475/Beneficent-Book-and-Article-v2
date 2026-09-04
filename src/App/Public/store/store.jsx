
import { configureStore } from '@reduxjs/toolkit'
import ArticleReducer from '../../../features/Slices/ArticleSlices'

export const store = configureStore({
  reducer: {
          ArticleSlices:ArticleReducer,

  },
})