import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RegionEnum } from '../../domain'
import { selectAllRetailers } from '../../store/commonSlice'
import {
  fetchPosmShots,
  selectSelectedRegion,
  selectSelectedRetailer,
  updatePosm,
} from '../../store/posmSlice'

interface IProps {
  id?: string
}

const PREFIX = 'PosmFilters'

export const PosmFilters: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const retailers = useSelector(selectAllRetailers)
  const selectedRegion = useSelector(selectSelectedRegion)
  const selectedRetailer = useSelector(selectSelectedRetailer)

  const handleRegionChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      console.log(event.target.value)
      dispatch(updatePosm({ selectedRegion: event.target.value }))
      dispatch(fetchPosmShots(true) as any)
    },
    [dispatch]
  )

  const handleRetailerChange = useCallback(
    (event: SelectChangeEvent<number>) => {
      console.log(event.target.value)
      dispatch(updatePosm({ selectedRetailerId: Number(event.target.value) }))
      dispatch(fetchPosmShots(true) as any)
    },
    [dispatch]
  )

  return (
    <div className={PREFIX}>
      <FormControl fullWidth>
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          labelId="region-label"
          id="region-select"
          value={selectedRegion}
          label="Region"
          onChange={handleRegionChange}
        >
          <MenuItem value={RegionEnum.NA}>{RegionEnum.NA}</MenuItem>
          <MenuItem value={RegionEnum.SEA}>{RegionEnum.SEA}</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="retailer-label">Retailer</InputLabel>
        <Select
          labelId="retailer-label"
          id="retailer-select"
          value={selectedRetailer}
          label="Retailer"
          onChange={handleRetailerChange}
        >
          {retailers.map((retailer) => (
            <MenuItem value={retailer.id} key={retailer.id}>
              {retailer.retailer_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
