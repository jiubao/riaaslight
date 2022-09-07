import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { uniq } from 'lodash'
import { RootState } from '.'
import { IPosmShot, IPosmShotDetail } from '../domain'
import { posmService } from '../services/posm'

interface IState {
  // imgId: string
  shot?: IPosmShot
  detail?: IPosmShotDetail
  lockDetail: boolean
  shots: IPosmShot[]
  lockShots: boolean
}

const initialState: IState = {
  lockDetail: false,
  lockShots: false,
  shots: [],
}

export const fetchPosmShotDetail = createAsyncThunk(
  'posmShot/fetchPosmShotDetail',
  async (imgId: string, { dispatch, getState }) => {
    const state = getState() as RootState
    if (state.posmShot.lockDetail) return Promise.reject(0)
    dispatch(updatePosmShot({ lockDetail: true }))
    try {
      return await posmService.getDetail(imgId)
    } finally {
      dispatch(updatePosmShot({ lockDetail: false }))
    }
  }
)

export const fetchPosmDetailShots = createAsyncThunk(
  'posmShot/fetchPosmDetailShots',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState
    if (state.posmShot.lockShots) return Promise.reject(0)
    const store_id = state.posmShot.shot?.store_id
    if (!store_id) return Promise.reject(0)
    dispatch(updatePosmShot({ lockShots: true }))
    try {
      return await posmService.get({ store_id })
    } finally {
      dispatch(updatePosmShot({ lockShots: false }))
    }
  }
)

export const posmShotSlice = createSlice({
  name: 'posmShot',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    reset(state) {
      state.lockDetail = false
      state.lockShots = false
      state.shots = []
      state.detail = undefined
      // state.shot = undefined
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosmShotDetail.fulfilled, (state, action) => {
      if (action.payload) state.detail = action.payload
    })
    builder.addCase(fetchPosmDetailShots.fulfilled, (state, action) => {
      if (action.payload) state.shots = action.payload
    })
  },
})

export const { update: updatePosmShot, reset: resetPosmShot } =
  posmShotSlice.actions

export default posmShotSlice.reducer

export const selectPosmShotDetail = (state: RootState) => state.posmShot.detail
export const selectPosmShot = (state: RootState) => state.posmShot.shot

export const selectPosmShotDetailBrands = (state: RootState) => {
  const { detail } = state.posmShot
  if (!detail) return []
  const { brands } = state.common
  const hash = new Map()
  brands.forEach((brand) => hash.set(brand.id, brand))
  return uniq(detail.posmshots.map((shot) => shot.brand_id)).map((id) =>
    hash.get(id)
  )
}

export const selectPosmShots = (state: RootState) => state.posmShot.shots
export const selectPosmShotIndex = (state: RootState) => {
  const { shots, shot } = state.posmShot
  const index = shots.findIndex((s) => s.id === shot?.id)
  console.log('s:', index)
  return index
}
