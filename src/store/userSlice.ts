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
