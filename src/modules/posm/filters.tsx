import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { RegionEnum } from '../../domain'

interface IProps {
  id?: string
}

const PREFIX = 'PosmFilters'

export const PosmFilters: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Region"
          // onChange={handleChange}
        >
          <MenuItem value={RegionEnum.NA}>{RegionEnum.NA}</MenuItem>
          <MenuItem value={RegionEnum.SEA}>{RegionEnum.SEA}</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
