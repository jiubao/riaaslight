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
  selectSelectedRegions,
  selectSelectedRetailers,
  updatePosm,
} from '../../store/posmSlice'

interface IProps {
  id?: string
}

const PREFIX = 'PosmFilters'

export const PosmFilters: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const retailers = useSelector(selectAllRetailers)
  const selectedRegions = useSelector(selectSelectedRegions)
  const selectedRetailers = useSelector(selectSelectedRetailers)

  const handleRegionChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      dispatch(updatePosm({ selectedRegions: event.target.value as string[] }))
      dispatch(fetchPosmShots(true) as any)
    },
    [dispatch]
  )

  const handleRetailerChange = useCallback(
    (event: SelectChangeEvent<number[]>) => {
      dispatch(
        updatePosm({
          selectedRetailerIds: event.target.value as number[],
        })
      )
      dispatch(fetchPosmShots(true) as any)
    },
    [dispatch]
  )

  return (
    <div className={PREFIX}>
      <FormControl fullWidth>
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          multiple
          labelId="region-label"
          id="region-select"
          value={selectedRegions}
          label="Region"
          onChange={handleRegionChange}
        >
          {/* <MenuItem value={''}>All</MenuItem> */}
          <MenuItem value={RegionEnum.NA}>{RegionEnum.NA}</MenuItem>
          <MenuItem value={RegionEnum.SEA}>{RegionEnum.SEA}</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="retailer-label">Retailer</InputLabel>
        <Select
          multiple
          labelId="retailer-label"
          id="retailer-select"
          value={selectedRetailers}
          label="Retailer"
          onChange={handleRetailerChange}
        >
          {/* <MenuItem value={''} key={-1}>
            All
          </MenuItem> */}
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
