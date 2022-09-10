import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './commonSlice'
import rogReducer from './rogSlice'
import storeReducer from './storeSlice'
import shelfReducer from './shelfSlice'
import posmReducer from './posmSlice'
import priceReducer from './priceSlice'
import posmShotReducer from './posmShotSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    common: commonReducer,
    rog: rogReducer,
    store: storeReducer,
    shelf: shelfReducer,
    posm: posmReducer,
    price: priceReducer,
    posmShot: posmShotReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
