import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IStore, IStoreRequest } from '../domain'
import { storeService } from '../services/store'

interface IState {
  stores: IStore[]
  selectedRetailerIds: number[]
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
}

const initialState: IState = {
  stores: [],
  selectedRetailerIds: [],
  selectedCategoryIds: [],
  selectedBrandIds: [],
}

export const fetchStores = createAsyncThunk(
  'common/fetchStores',
  async (params: IStoreRequest) => {
    return await storeService.get(params)
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
