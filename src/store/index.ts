import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './commonSlice'
import rogReducer from './rogSlice'
import storeReducer from './storeSlice'

const store = configureStore({
  reducer: {
    common: commonReducer,
    rog: rogReducer,
    store: storeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
