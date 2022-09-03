import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { last } from 'lodash'
import { RootState } from '.'
import { IPosmShot, RegionEnum } from '../domain'
import { posmService } from '../services/posm'
import { date2Month } from '../utils'

interface IState {
  shots: IPosmShot[]
  selectedRetailerId?: number
  region?: RegionEnum
  nextShotIndex: number
  hasNextShots: boolean
  lockShot: boolean
  monthes: Array<{ month: string; shotIds: number[] }>
}

const initialState: IState = {
  shots: [],
  nextShotIndex: 0,
  hasNextShots: true,
  lockShot: false,
  monthes: [],
}

const PAGE_SIZE = 20

export const fetchPosmShots = createAsyncThunk(
  'posm/fetchPosmShots',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const { nextShotIndex, lockShot } = state.posm
    if (lockShot) return

    dispatch(updatePosm({ lockShot: true }))
    try {
      const shots = await posmService.get({
        start: nextShotIndex,
        limit: PAGE_SIZE,
      })
      dispatch(appendPosmShots(shots))
    } finally {
      dispatch(updatePosm({ lockShot: false }))
    }
  }
)

export const posmSlice = createSlice({
  name: 'posm',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    append(state, action: PayloadAction<IPosmShot[]>) {
      const { shots, monthes } = state
      const incoming = action.payload
      const nextShots = shots.concat(incoming)
      const nextMonthes = [...monthes]
      for (let i = 0; i < incoming.length; i++) {
        const shot = incoming[i]
        const month = date2Month(shot.visit_date)
        const latest = last(nextMonthes)
        if (latest && latest.month === month) {
          latest.shotIds.push(shot.id)
        } else {
          nextMonthes.push({ month, shotIds: [shot.id] })
        }
      }
      state.shots = nextShots
      state.monthes = nextMonthes
      state.nextShotIndex = nextShots.length
      state.hasNextShots = incoming.length === PAGE_SIZE
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchPosmShots.fulfilled, (state, action) => {
  //     state.shots = action.payload
  //   })
  // },
})

export const { update: updatePosm, append: appendPosmShots } = posmSlice.actions

export default posmSlice.reducer

// export const selectShelfShotDetail = (state: RootState) => state.shelf.detail
// export const selectSelectedCategoryIds = (state: RootState) =>
//   state.shelf.selectedCategoryIds
// export const selectSelectedBrandIds = (state: RootState) =>
//   state.shelf.selectedBrandIds

export const selectPosmShotsGroup = (state: RootState) => {
  const { shots, monthes } = state.posm
  const hash = new Map()
  shots.forEach((shot) => hash.set(shot.id, shot))
  return monthes.map((item) => ({
    month: item.month,
    shots: item.shotIds.map((id) => hash.get(id)),
  }))
}
