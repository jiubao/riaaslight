import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './commonSlice'
import rogReducer from './rogSlice'

const store = configureStore({
  reducer: {
    rog: rogReducer,
    common: commonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
