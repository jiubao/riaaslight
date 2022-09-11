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

  selectedPublisherIds: number[]
  searchText: string
}

const initialState: IState = {
  publishers: [],
  lockPublisher: false,
  publications: [],
  lockPublication: false,
  next: 0,
  hasNext: true,

  selectedPublisherIds: [],
  searchText: '',
}

const limit = 200

export const fetchPublishers = createAsyncThunk(
  'publication/fetchPublishers',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const { publishers, lockPublisher } = state.publication
    if (lockPublisher) return Promise.reject(false)
    if (publishers.length) return publishers
    dispatch(updatePublication({ lockPublisher: true }))
    try {
      const res = await publicationService.getPublishers()
      dispatch(updatePublication({ publishers: res }))
    } finally {
      dispatch(updatePublication({ lockPublisher: false }))
    }
  }
)

export const fetchPublications = createAsyncThunk(
  'publication/fetchPublications',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const {
      lockPublication,
      hasNext,
      next,
      selectedPublisherIds,
      searchText,
      publications,
    } = state.publication
    if (lockPublication) return Promise.reject(false)
    if (!hasNext) return []
    dispatch(updatePublication({ lockPublisher: true }))
    try {
      const res =
        (await publicationService.getPublications({
          start: next,
          limit,
          search: searchText,
          publisher: selectedPublisherIds.join(','),
        })) || []

      const nextList = publications.concat(res)
      dispatch(
        updatePublication({
          publications: nextList,
          next: nextList.length,
          hasNext: res.length === limit,
        })
      )
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
    resetFilter(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...initialState,
        publishers: state.publishers,
        selectedPublisherIds: state.selectedPublisherIds,
        searchText: state.searchText,
        ...action.payload,
      }
    },
    reset(state) {
      return {
        ...initialState,
        publishers: state.publishers,
      }
    },
  },
})

export const {
  update: updatePublication,
  reset: resetPublication,
  resetFilter: resetPublicationFilter,
} = publicationSlice.actions

export default publicationSlice.reducer

export const selectPublishers = (state: RootState) =>
  state.publication.publishers
export const selectPublications = (state: RootState) =>
  state.publication.publications
export const selectSelectedPublisherIds = (state: RootState) =>
  state.publication.selectedPublisherIds
export const selectPublicationSearchText = (state: RootState) =>
  state.publication.searchText
