import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
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
import { PNGIcon } from '../../../../components/icons/pngIcon'
import { IRetailer } from '../../../../domain'
import { PngIconType } from '../../../../domain/icon'
import { getOption } from './util'

const PREFIX = 'PriceGraph'
interface IProps {
  className?: string
  value: string
  yMax: number
  yMin: number
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
  yMin,
  yMax,
  className,
}) {
  const retailerList = useSelector(retailerListSelector)
  const priceMap = useSelector(priceMapSelector)
  const retailerMap = useSelector(retailerMapSelector)
  const [options, setOptions] = useState<any>(null)
  useEffect(() => {
    if (priceMap && value && priceMap[value]) {
      const retailer = retailerMap[value]
      const color = retailer?.retailer_color
        ? '#' + retailer?.retailer_color
        : ''
      setOptions(getOption({ source: priceMap[value], color, yMax, yMin }))
    }
  }, [value, priceMap, yMin, yMax, retailerMap])

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
      <Select
        className={`${PREFIX}-select`}
        size="small"
        value={value}
        onChange={handleChange}
        renderValue={(val) => {
          const retailer = retailerMap[val]
          return (
            <div className={`${PREFIX}-select-value`}>
              <PNGIcon
                className={`${PREFIX}-icon`}
                name={retailer?.retailer_name}
                type={PngIconType.Retailer}
              />
              <span className={`${PREFIX}-select-value-text`}>
                {retailer?.retailer_name || value}
              </span>
            </div>
          )
        }}
      >
        {retailerOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <PNGIcon
              className={`${PREFIX}-icon`}
              name={item.label}
              type={PngIconType.Retailer}
            />
            {item.label}
          </MenuItem>
        ))}
      </Select>
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
