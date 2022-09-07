import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IBrand, ICategory, ICountry, IRetailer } from '../domain'
import { brandService } from '../services/brand'
import { categoryService } from '../services/category'
import { retailerService } from '../services/retailer'

interface IState {
  retailers: IRetailer[]
  categories: ICategory[]
  countries: ICountry[]
  brands: IBrand[]
  lockRetailer: boolean
  lockCategory: boolean
  lockBrand: boolean
}

const initialState: IState = {
  retailers: [],
  categories: [],
  brands: [],
  lockRetailer: false,
  lockCategory: false,
  lockBrand: false,
  countries: [{ country_name: 'US' }, { country_name: 'Philippines' }],
}

export const fetchRetailers = createAsyncThunk(
  'common/fetchRetailers',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const { retailers, lockRetailer } = state.common
    if (retailers.length) {
      return state.common.retailers
    }
    if (lockRetailer) {
      return Promise.reject(0)
    }

    dispatch(updateCommon({ lockRetailer: true }))

    try {
      return await retailerService.get()
    } finally {
      dispatch(updateCommon({ lockRetailer: false }))
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'common/fetchCategories',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const { categories, lockCategory } = state.common
    if (categories.length) {
      return state.common.categories
    }
    if (lockCategory) return Promise.reject(0)

    dispatch(updateCommon({ lockCategory: true }))
    try {
      const res = await categoryService.get()
      dispatch(updateCommon({ categories: res }))
      return res
    } finally {
      dispatch(updateCommon({ lockCategory: false }))
    }
  }
)

export const fetchAllBrands = createAsyncThunk(
  'common/fetchAllBrands',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const { brands, lockBrand } = state.common
    if (brands.length) return brands
    if (lockBrand) return Promise.reject(0)
    dispatch(updateCommon({ lockBrand: true }))
    try {
      const res = await brandService.getAll()
      dispatch(updateCommon({ brands: res }))
    } finally {
      dispatch(updateCommon({ lockBrand: false }))
    }
  }
)

// export const fetchBrands = createAsyncThunk(
//   'common/fetchBrands',
//   async (id: number) => {
//     return await brandService.get(id)
//   }
// )

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
    // builder.addCase(fetchCategories.fulfilled, (state, action) => {
    //   state.categories = action.payload
    // })
    // builder.addCase(fetchBrands.fulfilled, (state, action) => {
    //   state.brands = action.payload
    // })
    // builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
    //   state.brands = action.payload
    // })
  },
})

export const { update: updateCommon } = commonSlice.actions

export default commonSlice.reducer

export const selectAllRetailers = (state: RootState) => state.common.retailers
export const selectAllCategories = (state: RootState) => state.common.categories
export const selectAllCountries = (state: RootState) => state.common.countries
export const selectAllBrands = (state: RootState) => state.common.brands
