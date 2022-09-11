import React, { useCallback, useMemo } from 'react'
import { Publishers } from './publishers'
import './index.scss'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPublications,
  resetPublicationFilter,
  selectPublicationSearchText,
  selectPublishersWithIcon,
  selectSelectedPublisherIds,
} from '../../../store/publicationSlice'
import { debounce } from 'lodash'

const PREFIX = 'PublicationFilter'

export const PublicationFilter: React.FC = () => {
  const dispatch = useDispatch()
  const publishers = useSelector(selectPublishersWithIcon)
  const selectedPublisherIds = useSelector(selectSelectedPublisherIds)
  const searchText = useSelector(selectPublicationSearchText)

  const handlePublisherChange = useCallback(
    (value: number[]) => {
      dispatch(resetPublicationFilter({ selectedPublisherIds: value }))
      dispatch(fetchPublications() as any)
    },
    [dispatch]
  )

  const fetchMore = useMemo(() => {
    return debounce(() => dispatch(fetchPublications() as any), 300)
  }, [dispatch])

  const handleSearchTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(resetPublicationFilter({ searchText: event.target.value }))
      fetchMore()
    },
    [dispatch, fetchMore]
  )

  return (
    <div className={PREFIX}>
      <Publishers
        value={selectedPublisherIds}
        all={publishers}
        onChange={handlePublisherChange}
      />
      <TextField
        value={searchText}
        onChange={handleSearchTextChange}
        className={`${PREFIX}-search`}
        sx={{ m: 1, width: '40ch' }}
        placeholder="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
