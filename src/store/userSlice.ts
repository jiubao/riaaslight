import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IUser } from '../domain'
import { authService } from '../services/auth'

interface IState {
  user?: IUser
  lockUser: boolean
}

const initialState: IState = {
  lockUser: false,
}

// export const fetchPosmShotDetail = createAsyncThunk(
//   'posmShot/fetchPosmShotDetail',
//   async (imgId: string, { dispatch, getState }) => {
//     const state = getState() as RootState
//     if (state.posmShot.lockDetail) return Promise.reject(0)
//     dispatch(updatePosmShot({ lockDetail: true }))
//     try {
//       const detail = await posmService.getDetail(imgId)
//       let shots = detail
//         ? await posmService.get({ store_id: detail.store_id })
//         : []
//       dispatch(updatePosmShot({ detail, shots }))
//     } finally {
//       dispatch(updatePosmShot({ lockDetail: false }))
//     }
//   }
// )

// export const fetchPosmDetailShots = createAsyncThunk(
//   'posmShot/fetchPosmDetailShots',
//   async (_, { dispatch, getState }) => {
//     const state = getState() as RootState
//     if (state.posmShot.lockShots) return Promise.reject(0)
//     const store_id = state.posmShot.shot?.store_id
//     if (!store_id) return Promise.reject(0)
//     dispatch(updatePosmShot({ lockShots: true }))
//     try {
//       return await posmService.get({ store_id })
//     } finally {
//       dispatch(updatePosmShot({ lockShots: false }))
//     }
//   }
// )

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const { user, lockUser } = state.user
    if (lockUser) return Promise.reject(0)
    if (user) return Promise.resolve(user)

    dispatch(updateUser({ lockUser: true }))
    try {
      return await authService.user()
    } finally {
      dispatch(updateUser({ lockUser: false }))
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    reset(state) {
      // state.lockDetail = false
      // state.lockShots = false
      // state.shots = []
      // state.detail = undefined
      // state.shot = undefined
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) state.user = action.payload
    })
  },
})

export const { update: updateUser } = userSlice.actions

export default userSlice.reducer

export const selectUser = (state: RootState) => state.user.user
// export const selectPosmShot = (state: RootState) => state.posmShot.shot

// export const selectPosmShotDetailBrands = (state: RootState) => {
//   const { detail } = state.posmShot
//   if (!detail) return []
//   const { brands } = state.common
//   const hash = new Map()
//   brands.forEach((brand) => hash.set(brand.id, brand))
//   return uniq(detail.posmshots.map((shot) => shot.brand_id)).map((id) =>
//     hash.get(id)
//   )
// }

// export const selectPosmShots = (state: RootState) => state.posmShot.shots
// export const selectPosmShotIndex = (state: RootState) => {
//   const { shots, shot } = state.posmShot
//   const index = shots.findIndex((s) => s.id === shot?.id)
//   console.log('s:', index)
//   return index
// }
