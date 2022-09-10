import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IBrand, IStore, IStoreDetail, IStoreRequest } from '../domain'
import { IMapBounds } from '../domain/map'
import { brandService } from '../services/brand'
import { storeService } from '../services/store'

interface IState {
  stores: IStore[]
  selectedRetailerIds: number[]
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
  bounds?: IMapBounds
  storeDetail?: IStoreDetail
  brands: IBrand[]
}

const initialState: IState = {
  stores: [],
  selectedRetailerIds: [],
  selectedCategoryIds: [],
  selectedBrandIds: [],
  brands: [],
}

const field_set = 'location'
const default_range =
  '50.97380320853852,-65.24909547188548,22.737910001296626,-128.53034547188548'

export const fetchBrands = createAsyncThunk(
  'rog/fetchBrands',
  async (id: number) => {
    return await brandService.get(id)
  }
)

export const fetchStores = createAsyncThunk(
  'common/fetchStores',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const {
      bounds,
      selectedBrandIds,
      selectedCategoryIds,
      selectedRetailerIds,
    } = state.rog

    if (selectedCategoryIds.length === 0) {
      dispatch(
        updateRog({
          selectedBrandIds: [],
        })
      )
      return []
    }

    const query: IStoreRequest = {
      retailer: selectedRetailerIds.join(','),
      brand: selectedBrandIds.join(','),
      category: selectedCategoryIds.join(','),
      field_set,
      location_range: bounds
        ? `${bounds.ne.lat},${bounds.ne.lng},${bounds.sw.lat},${bounds.sw.lng}`
        : default_range,
      start: 0,
      limit: 5000,
    }

    if (!query.location_range) return Promise.resolve([])

    return await storeService.get(query)
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
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload
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

export const selectRogBrands = (state: RootState) => state.rog.brands
