import React from 'react'
import { Publishers } from './publishers'
import './index.scss'
import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const PREFIX = 'PublicationFilter'

export const PublicationFilter: React.FC = () => {
  return (
    <div className={PREFIX}>
      <Publishers />
      <TextField
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
