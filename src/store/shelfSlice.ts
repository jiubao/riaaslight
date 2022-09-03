import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { RootState } from '.'
import { IShelfShotDetail } from '../domain'
import { PositionType } from '../domain/shape'
import { shelfShotService } from '../services/shelfShot'

interface IState {
  detail?: IShelfShotDetail
  selectedCategoryIds: number[]
  selectedBrandIds: number[]
  currentShelfId?: number
}

const initialState: IState = {
  selectedCategoryIds: [],
  selectedBrandIds: [],
}

export const fetchShelfByIndex = createAsyncThunk(
  'shelf/fetchShelf',
  async (index: number, { dispatch, getState }) => {
    const state = getState() as RootState
    const id = get(state.store.shelfShots, [index, 'id'])
    if (id) {
      dispatch(fetchShelf(id))
    }
  }
)

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
    reset(state) {
      state.selectedCategoryIds = []
      state.selectedBrandIds = []
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchShelf.fulfilled, (state, action) => {
      state.detail = action.payload
    })
  },
})

export const { update: updateShelf, reset: resetShelf } = shelfSlice.actions

export default shelfSlice.reducer

export const selectShelfShotDetail = (state: RootState) => state.shelf.detail
export const selectSelectedCategoryIds = (state: RootState) =>
  state.shelf.selectedCategoryIds
export const selectSelectedBrandIds = (state: RootState) =>
  state.shelf.selectedBrandIds

export const selectShelfBrands = (state: RootState) => {
  const hash = new Map()
  state.store.brands.forEach((brand) => hash.set(`${brand.id}`, brand))
  return state.shelf.detail
    ? Object.keys(state.shelf.detail.brand_map)
        .map((id) => hash.get(id))
        .filter(Boolean)
    : []
}

export const selectShelfCategories = (state: RootState) => {
  const hash = new Map()
  state.common.categories.forEach((category) =>
    hash.set(String(category.id), category)
  )
  return state.shelf.detail
    ? Object.keys(state.shelf.detail.category_map)
        .map((id) => hash.get(id))
        .filter(Boolean)
    : []
}

export const selectSelectedBrandsPositions = (state: RootState) => {
  const { detail, selectedBrandIds } = state.shelf
  if (!detail || selectedBrandIds.length === 0) return []
  return selectedBrandIds.reduce<PositionType[]>((result, id) => {
    if (detail.brand_map[id]) {
      result = result.concat(
        detail.brand_map[id].map((position) => [
          position[0],
          position[1],
          position[2] - position[0],
          position[3] - position[1],
        ])
      )
    }
    return result
  }, [])
}

export const selectShelfIndex = (state: RootState) => {
  const { detail } = state.shelf
  const { shelfShots } = state.store
  return detail ? shelfShots.findIndex((shot) => shot.id === detail.id) : -1
}
