import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import cls from 'classnames'
import ReactECharts from 'echarts-for-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllRetailers } from '../../../../store/commonSlice'
import {
  priceMapSelector,
  retailerListSelector,
} from '../../../../store/priceSlice'
import './index.scss'

import { createSelector } from 'reselect'
import { IRetailer } from '../../../../domain'
import { getOption } from './util'
const PREFIX = 'PriceGraph'
interface IProps {
  className?: string
  value: string
  onChange?: (data: string) => void
}
const retailerMapSelector = createSelector(selectAllRetailers, (retailers) => {
  return (retailers || []).reduce((out, item) => {
    out[item.id] = item
    return out
  }, {} as { [key: string]: IRetailer })
})

const PriceGraph: React.FC<IProps> = React.memo(function PriceGraph({
  value,
  onChange,
  className,
}) {
  const retailerList = useSelector(retailerListSelector)
  const priceMap = useSelector(priceMapSelector)
  const retailerMap = useSelector(retailerMapSelector)
  const [options, setOptions] = useState<any>(null)
  useEffect(() => {
    if (priceMap && value && priceMap[value]) {
      const retailer = retailerMap[value]
      setOptions(getOption(priceMap[value], retailer?.retailer_color))
    }
  }, [value, priceMap, retailerMap])

  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange?.(e.target.value)
  }

  const retailerOptions = useMemo(() => {
    return (retailerList || []).map((item) => {
      const retailer = retailerMap[item] || {}
      return {
        label: retailer.retailer_name || item,
        value: item,
      }
    })
  }, [retailerList, retailerMap])
  return (
    <div className={cls(`${PREFIX}`, className)}>
      <FormControl sx={{ m: 1, width: 162, marginLeft: 2 }} size="small">
        <Select id="demo-select-small" value={value} onChange={handleChange}>
          {retailerOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={`${PREFIX}-content`}>
        {options && (
          <ReactECharts
            className={`${PREFIX}-graph`}
            option={options}
            notMerge={true}
            lazyUpdate={true}
            theme={'theme_name'}
          />
        )}
      </div>
    </div>
  )
})

export default PriceGraph
