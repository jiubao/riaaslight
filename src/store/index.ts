import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './commonSlice'
import rogReducer from './rogSlice'
import priceReducer from './priceSlice'

const store = configureStore({
  reducer: {
    rog: rogReducer,
    common: commonReducer,
    price: priceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
