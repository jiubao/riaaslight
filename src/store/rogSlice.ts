import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IStore, IStoreDetail, IStoreRequest } from '../domain'
import { IMapBounds } from '../domain/map'
import { storeService } from '../services/store'

interface IState {
  stores: IStore[]
  selectedRetailerIds: number[]
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
  bounds?: IMapBounds
  storeDetail?: IStoreDetail
}

const initialState: IState = {
  stores: [],
  selectedRetailerIds: [],
  selectedCategoryIds: [],
  selectedBrandIds: [],
}

const field_set = 'location'
const default_range =
  '50.97380320853852,-65.24909547188548,22.737910001296626,-128.53034547188548'

export const fetchStores = createAsyncThunk(
  'common/fetchStores',
  async (params: Partial<IStoreRequest>, api) => {
    const state = api.getState() as RootState
    const bounds = state.rog.bounds
    const baseParams: IStoreRequest = {
      brand: state.rog.selectedBrandIds.join(','),
      category: state.rog.selectedCategoryIds.join(','),
      field_set,
      location_range: bounds
        ? `${bounds.ne.lat},${bounds.ne.lng},${bounds.sw.lat},${bounds.sw.lng}`
        : default_range,
      start: 0,
      limit: 5000,
    }

    const query = { ...baseParams, ...params }
    if (!query.brand || !query.category || !query.location_range)
      return Promise.resolve([])
    return await storeService.get({ ...baseParams, ...params })
  }
)

export const fetchStoreDetail = createAsyncThunk(
  'common/fetchStoreDetail',
  async (id: number) => {
    return await storeService.getById(id)
  }
)

export const rogSlice = createSlice({
  name: 'rog',
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
    builder.addCase(fetchStores.fulfilled, (state, action) => {
      state.stores = action.payload
    })
    builder.addCase(fetchStoreDetail.fulfilled, (state, action) => {
      state.storeDetail = action.payload
    })
  },
})

export const { update: updateRog } = rogSlice.actions

export default rogSlice.reducer

export const selectSelectedRetailerIds = (state: RootState) =>
  state.rog.selectedRetailerIds
export const selectSelectedCategoryIds = (state: RootState) =>
  state.rog.selectedCategoryIds
export const selectSelectedBrandIds = (state: RootState) =>
  state.rog.selectedBrandIds
export const selectStores = (state: RootState) => state.rog.stores
export const selectMapBounds = (state: RootState) => state.rog.bounds
export const selectStoreDetail = (state: RootState) => state.rog.storeDetail
