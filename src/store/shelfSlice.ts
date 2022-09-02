import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IShelfShotDetail } from '../domain'
import { shelfShotService } from '../services/shelfShot'

interface IState {
  detail?: IShelfShotDetail
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
}

const initialState: IState = {
  selectedCategoryIds: [],
  selectedBrandIds: [],
}

export const fetchShelf = createAsyncThunk(
  'shelf/fetchShelf',
  async (id: number) => {
    return await shelfShotService.getById(id)
  }
)

export const shelfSlice = createSlice({
  name: 'shelf',
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
    builder.addCase(fetchShelf.fulfilled, (state, action) => {
      state.detail = action.payload
    })
  },
})

export const { update: updateShelf } = shelfSlice.actions

export default shelfSlice.reducer

export const selectShelfShotDetail = (state: RootState) => state.shelf.detail
export const selectSelectedCategoryIds = (state: RootState) =>
  state.shelf.selectedCategoryIds
export const selectSelectedBrandIds = (state: RootState) =>
  state.shelf.selectedBrandIds

export const selectShelfBrands = (state: RootState) => {
  const hash = new Map()
  state.store.brands.forEach((brand) => hash.set(`${brand.id}`, brand))
  return Object.keys(state.shelf.detail!.brand_map)
    .map((id) => hash.get(id))
    .filter(Boolean)
}

export const selectShelfCategories = (state: RootState) => {
  const hash = new Map()
  state.common.categories.forEach((category) =>
    hash.set(String(category.id), category)
  )
  return Object.keys(state.shelf.detail!.category_map)
    .map((id) => hash.get(id))
    .filter(Boolean)
}
