import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './commonSlice'
import rogReducer from './rogSlice'
import storeReducer from './storeSlice'
import shelfReducer from './shelfSlice'

const store = configureStore({
  reducer: {
    common: commonReducer,
    rog: rogReducer,
    store: storeReducer,
    shelf: shelfReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
