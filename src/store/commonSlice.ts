import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IBrand, ICategory, IRetailer } from '../domain'
import { brandService } from '../services/brand'
import { categoryService } from '../services/category'
import { retailerService } from '../services/retailer'

interface IState {
  retailers: IRetailer[]
  categories: ICategory[]
  brands: IBrand[]
}

const initialState: IState = {
  retailers: [],
  categories: [],
  brands: [],
}

export const fetchRetailers = createAsyncThunk(
  'common/fetchRetailers',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState
    if (state.common.retailers.length) {
      return state.common.retailers
    }

    return await retailerService.get()
  }
)

export const fetchCategories = createAsyncThunk(
  'common/fetchCategories',
  async (_, api) => {
    const state = api.getState() as RootState
    if (state.common.categories.length) {
      return state.common.categories
    }
    return await categoryService.get()
  }
)

export const fetchBrands = createAsyncThunk(
  'common/fetchBrands',
  async (id: number) => {
    return await brandService.get(id)
  }
)

const commonSlice = createSlice({
  name: 'common',
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
    builder.addCase(fetchRetailers.fulfilled, (state, action) => {
      state.retailers = action.payload
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
  },
})

export const { update: updateCommon } = commonSlice.actions

export default commonSlice.reducer

export const selectAllRetailers = (state: RootState) => state.common.retailers
export const selectAllCategories = (state: RootState) => state.common.categories
export const selectAllBrands = (state: RootState) => state.common.brands
