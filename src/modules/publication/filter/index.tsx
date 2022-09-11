import React, { useCallback } from 'react'
import { Publishers } from './publishers'
import './index.scss'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPublicationSearchText,
  selectPublishers,
  selectSelectedPublisherIds,
  updatePublication,
} from '../../../store/publicationSlice'

const PREFIX = 'PublicationFilter'

export const PublicationFilter: React.FC = () => {
  const dispatch = useDispatch()
  const publishers = useSelector(selectPublishers)
  const selectedPublisherIds = useSelector(selectSelectedPublisherIds)
  const searchText = useSelector(selectPublicationSearchText)

  const handlePublisherChange = useCallback(
    (value: number[]) => {
      dispatch(updatePublication({ selectedPublisherIds: value }))
    },
    [dispatch]
  )

  const handleSearchTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updatePublication({ searchText: event.target.value }))
    },
    [dispatch]
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
