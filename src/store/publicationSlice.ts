import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { IPublication, IPublisher } from '../domain'
import { publicationService } from '../services/publication'

interface IState {
  publishers: IPublisher[]
  lockPublisher: boolean
  publications: IPublication[]
  lockPublication: boolean
  next: number
  hasNext: boolean
}

const initialState: IState = {
  publishers: [],
  lockPublisher: false,
  publications: [],
  lockPublication: false,
  next: 0,
  hasNext: true,
}

export const fetchPublishers = createAsyncThunk(
  'publication/fetchPublishers',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const { publishers, lockPublisher } = state.publication
    if (lockPublisher) return Promise.reject(false)
    if (publishers) return publishers
    dispatch(updatePublication({ lockPublisher: true }))
    try {
      const res = await publicationService.getPublishers()
      dispatch(updatePublication({ publishers: res }))
    } finally {
      dispatch(updatePublication({ lockPublisher: false }))
    }
  }
)

export const publicationSlice = createSlice({
  name: 'publication',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    reset() {
      return {
        ...initialState,
      }
    },
  },
})

export const { update: updatePublication, reset: resetPublication } =
  publicationSlice.actions

export default publicationSlice.reducer

export const selectPublishers = (state: RootState) =>
  state.publication.publishers
export const selectPublications = (state: RootState) =>
  state.publication.publications
