import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IBrand } from '../domain'
import { brandService } from '../services/brand'

export const fetchBrands = createAsyncThunk('common/fetchBrands', async () => {
  return await brandService.get()
})

interface IState {
  brands: IBrand[]
}

const initialState: IState = {
  brands: [],
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.brands = action.payload
    })
  },
})

export default commonSlice.reducer

export const selectAllBrands = (state: RootState) => state.common.brands
