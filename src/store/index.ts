import { configureStore } from '@reduxjs/toolkit'
import rogReducer from './rogSlice'

export default configureStore({
  reducer: {
    rog: rogReducer,
  },
})
