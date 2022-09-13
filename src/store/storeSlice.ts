import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { last, orderBy } from 'lodash'
import { RootState } from '.'
import { IShelfShot, IStoreDetail } from '../domain'
import { shelfShotService } from '../services/shelfShot'
import { storeService } from '../services/store'
import { date2Month } from '../utils'

interface IState {
  storeDetail?: IStoreDetail
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
  shelfShots: IShelfShot[]
  monthes: Array<{ month: string; shelfIds: number[] }>
  nextShotIndex: number
  hasNextShots: boolean
  lockShot: boolean
}

const initialState: IState = {
  storeDetail: undefined,
  selectedCategoryIds: [],
  selectedBrandIds: [],
  shelfShots: [],
  monthes: [],
  nextShotIndex: 0,
  hasNextShots: true,
  lockShot: false,
}

const SHOT_PAGE_SIZE = 20

export const fetchShelfShots = createAsyncThunk(
  'store/fetchShelfShots',
  async ({ storeId }: { storeId?: number }, { dispatch, getState }) => {
    const state = getState() as RootState
    if (state.store.lockShot) return
    dispatch(updateStore({ lockShot: true }))
    try {
      const {
        nextShotIndex,
        storeDetail,
        selectedBrandIds,
        selectedCategoryIds,
      } = state.store
      const shots = await shelfShotService.get({
        start: nextShotIndex,
        limit: SHOT_PAGE_SIZE,
        store_id: storeId || storeDetail?.store_id,
        brand: selectedBrandIds.join(','),
        category: selectedCategoryIds.join(','),
      })
      dispatch(appendShelfShots(shots))
      return shots
    } finally {
      dispatch(updateStore({ lockShot: false }))
    }
  }
)

export const fetchStoreDetail = createAsyncThunk(
  'store/fetchStoreDetail',
  async (id: number) => {
    return await storeService.getById(id)
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
    appendShelfShots(state, action: PayloadAction<IShelfShot[]>) {
      const { shelfShots, monthes } = state
      const incoming = action.payload
      const nextShelfShots = shelfShots.concat(incoming)
      const nextMonthes = [...monthes]
      for (let i = 0; i < incoming.length; i++) {
        const shot = incoming[i]
        const month = date2Month(shot.visit_date)
        const latest = last(nextMonthes)
        if (latest && latest.month === month) {
          latest.shelfIds.push(shot.id)
        } else {
          nextMonthes.push({ month: month, shelfIds: [shot.id] })
        }
      }
      state.shelfShots = nextShelfShots
      state.monthes = nextMonthes
      state.nextShotIndex = nextShelfShots.length
      state.hasNextShots = incoming.length === SHOT_PAGE_SIZE
    },
    resetCategory(state, action) {
      return {
        ...initialState,
        storeDetail: state.storeDetail,
        selectedCategoryIds: action.payload,
      }
    },
    resetBrand(state, action) {
      return {
        ...initialState,
        storeDetail: state.storeDetail,
        selectedCategoryIds: state.selectedCategoryIds,
        selectedBrandIds: action.payload,
      }
    },
    reset() {
      return { ...initialState }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStoreDetail.fulfilled, (state, action) => {
      state.storeDetail = action.payload
    })
  },
})

export const {
  update: updateStore,
  appendShelfShots,
  resetCategory: resetStoreCategory,
  resetBrand: resetStoreBrand,
  reset: resetStore,
} = storeSlice.actions

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
  const all = state.common.brands
  const map = new Map()
  all.forEach((item) => map.set(item.id, item))

  const store = state.store.storeDetail
  if (!store || !store.brand_map || all.length === 0) return []
  const list = Object.keys(store.brand_map).map((key) => {
    const name = map.get(Number(key))?.brand_name
    return {
      brandId: Number(key),
      count: store.brand_map[key],
      name,
    }
  })

  const otherIndex = list.findIndex(
    (item) => String(item.name).toUpperCase() === 'OTHER'
  )
  let others: any[] = []
  if (otherIndex >= 0) {
    others = list.splice(otherIndex, 1)
  }

  const sorted = orderBy(list, ['count'], ['desc'])
  if (otherIndex >= 0) {
    sorted.push(others[0])
  }

  return sorted.map((item) => map.get(item.brandId)).filter(Boolean)
}

export const selectStoreDetail = (state: RootState) => state.store.storeDetail
export const selectShelfShots = (state: RootState) => state.store.shelfShots
export const selectShelfShotsGroup = (state: RootState) => {
  const { shelfShots, monthes } = state.store
  const hash = new Map()
  shelfShots.forEach((shot) => hash.set(shot.id, shot))
  return monthes.map((item) => ({
    month: item.month,
    shots: item.shelfIds.map((id) => hash.get(id)),
  }))
}

export const selectHasNextShots = (state: RootState) => {
  return state.store.hasNextShots
}

export const selectStoreRetailer = (state: RootState) => {
  const id = state.store.storeDetail?.retailer_id
  return id ? state.common.retailers.find((r) => r.id === id) : undefined
}
