import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { priceService } from '../services/price'
import { skuService } from '../services/sku'
import { ISku } from '../domain'
interface IState {
  searchParams: {
    category: string
    country: string
    // search: string
  }
  list: ISku[]
}

const initialState: IState = {
  searchParams: {
    category: '',
    country: '',
    // search: '',
  },
  list: [],
}

export const fetchPriceList = createAsyncThunk(
  'common/fetchPriceList',
  async (_, api) => {
    const state = api.getState() as RootState
    if (state.price.list.length) {
      return state.price.list
    }
    const res = await skuService.get(state.price.searchParams)
    if (res && Array.isArray(res)) {
      return res
    }
    return []
  }
)

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    updateParams(
      state,
      action: PayloadAction<Partial<IState['searchParams']>>
    ) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPriceList.fulfilled, (state, action) => {
      state.list = action.payload
    })
  },
})

export const { update: updatePrice, updateParams } = priceSlice.actions

export default priceSlice.reducer

export const selectSearchParams = (state: RootState) => state.price.searchParams
export const priceList = (state: RootState) => state.price.list
