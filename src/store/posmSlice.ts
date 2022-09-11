import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { last } from 'lodash'
import { RootState } from '.'
import { IPosmShot } from '../domain'
import { posmService } from '../services/posm'
import { date2Month } from '../utils'

interface IState {
  selectedRegions: string[]
  selectedRetailerIds: number[]
  shots: IPosmShot[]
  nextShotIndex: number
  hasNextShots: boolean
  lockShot: boolean
  monthes: Array<{ month: string; shotIds: number[] }>
}

const initialState: IState = {
  selectedRegions: [],
  selectedRetailerIds: [],
  shots: [],
  nextShotIndex: 0,
  hasNextShots: true,
  lockShot: false,
  monthes: [],
}

const PAGE_SIZE = 20

export const fetchPosmShots = createAsyncThunk(
  'posm/fetchPosmShots',
  async (refetch: boolean, { getState, dispatch }) => {
    const state = getState() as RootState
    const { nextShotIndex, lockShot, selectedRegions, selectedRetailerIds } =
      state.posm
    if (lockShot) return
    if (refetch) {
      dispatch(
        updatePosm({
          shots: [],
          nextShotIndex: 0,
          hasNextShots: true,
          monthes: [],
        })
      )
    }

    dispatch(updatePosm({ lockShot: true }))
    try {
      const shots = await posmService.get({
        start: nextShotIndex,
        limit: PAGE_SIZE,
        region: selectedRegions.join(','),
        retailer: selectedRetailerIds.join(','),
      })
      dispatch(appendPosmShots(shots))
      return shots
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
    reset() {
      return { ...initialState }
    },
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchPosmShots.fulfilled, (state, action) => {
  //     state.shots = action.payload
  //   })
  // },
})

export const {
  update: updatePosm,
  append: appendPosmShots,
  reset: resetPosm,
} = posmSlice.actions

export default posmSlice.reducer

// export const selectShelfShotDetail = (state: RootState) => state.shelf.detail
export const selectSelectedRegions = (state: RootState) =>
  state.posm.selectedRegions
export const selectSelectedRetailers = (state: RootState) =>
  state.posm.selectedRetailerIds

export const selectPosmShotsGroup = (state: RootState) => {
  const { shots, monthes } = state.posm
  const hash = new Map()
  shots.forEach((shot) => hash.set(shot.id, shot))
  return monthes.map((item) => ({
    month: item.month,
    shots: item.shotIds.map((id) => hash.get(id)),
  }))
}

export const selectHasNextShots = (state: RootState) => {
  return state.posm.hasNextShots
}

export const selectPosmShots = (state: RootState) => state.posm.shots
