import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  PayloadAction,
} from '@reduxjs/toolkit'
import { orderBy } from 'lodash'
import { RootState } from '.'
import { IBrand, IShelfShot, IStoreDetail } from '../domain'
import { brandService } from '../services/brand'
import { shelfShotService } from '../services/shelfShot'
import { storeService } from '../services/store'

interface IState {
  storeDetail?: IStoreDetail
  shelfShots: IShelfShot[]
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
  brands: IBrand[]
}

const initialState: IState = {
  shelfShots: [],
  selectedCategoryIds: [],
  selectedBrandIds: [],
  brands: [],
}

export const fetchShelfShots = createAsyncThunk(
  'store/fetchShelfShots',
  async (store_id: number) => {
    return await shelfShotService.get({ store_id })
  }
)

export const fetchStoreDetail = createAsyncThunk(
  'store/fetchStoreDetail',
  async (id: number) => {
    return await storeService.getById(id)
  }
)

export const fetchBrands = createAsyncThunk(
  'store/fetchBrands',
  async (id: number) => {
    return await brandService.get(id)
  }
)

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStoreDetail.fulfilled, (state, action) => {
      state.storeDetail = action.payload
    })
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
    builder.addCase(fetchShelfShots.fulfilled, (state, action) => {
      state.shelfShots = action.payload
    })
  },
})

export const { update: updateStore } = storeSlice.actions

export default storeSlice.reducer

export const selectSelectedCategoryIds = (state: RootState) =>
  state.store.selectedCategoryIds

export const selectStoreCategories = (state: RootState) => {
  const all = state.common.categories
  const map = new Map()
  all.forEach((item) => map.set(item.id, item))

  const store = state.store.storeDetail
  if (!store || !store.category_map || all.length === 0) return []
  const list = Object.keys(store.category_map).map((key) => ({
    categoryId: Number(key),
    count: store.category_map[key],
  }))

  const sorted = orderBy(list, ['count'], ['desc'])
  return sorted.map((item) => map.get(item.categoryId)).filter(Boolean)
}

export const selectSelectedBrandIds = (state: RootState) =>
  state.store.selectedBrandIds

export const selectStoreBrands = (state: RootState) => {
  const all = state.store.brands
  const map = new Map()
  all.forEach((item) => map.set(item.id, item))

  const store = state.store.storeDetail
  if (!store || !store.brand_map || all.length === 0) return []
  const list = Object.keys(store.brand_map).map((key) => ({
    brandId: Number(key),
    count: store.brand_map[key],
  }))

  const sorted = orderBy(list, ['count'], ['desc'])
  return sorted.map((item) => map.get(item.brandId)).filter(Boolean)
}

export const selectStoreDetail = (state: RootState) => state.store.storeDetail
export const selectShelfShots = (state: RootState) => state.store.shelfShots
