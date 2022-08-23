import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IBrand, ICategory, IRetailer } from '../domain'
import { brandService } from '../services/brand'
import { categoryService } from '../services/category'
import { retailerService } from '../services/retailer'

export const fetchRetailers = createAsyncThunk(
  'common/fetchRetailers',
  async () => {
    return await retailerService.get()
  }
)

export const fetchCategories = createAsyncThunk(
  'common/fetchCategories',
  async () => {
    return await categoryService.get()
  }
)

export const fetchBrands = createAsyncThunk('common/fetchBrands', async () => {
  return await brandService.get()
})

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

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
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

export default commonSlice.reducer

export const selectAllRetailers = (state: RootState) => state.common.retailers
export const selectAllCategories = (state: RootState) => state.common.categories
export const selectAllBrands = (state: RootState) => state.common.brands
