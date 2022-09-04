import React, { useRef, useEffect, useState } from 'react'
import cls from 'classnames'
import ReactECharts from 'echarts-for-react'
import { getOption } from './util'
const PREFIX = 'PriceGraph'
import './index.scss'
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material'
import { useSelector } from 'react-redux'
import {
  priceMapSelector,
  retailerListSelector,
} from '../../../../store/priceSlice'
interface IProps {
  className?: string
  value: string
  onChange?: (data: string) => void
}

const PriceGraph: React.FC<IProps> = React.memo(function PriceGraph({
  value,
  onChange,
  className,
}) {
  const retailerList = useSelector(retailerListSelector)
  const priceMap = useSelector(priceMapSelector)
  const [options, setOptions] = useState<any>(null)
  useEffect(() => {
    if (priceMap && value && priceMap[value]) {
      console.log('render graph', className, value)
      setOptions(getOption(priceMap[value]))
    }
  }, [value, priceMap])

  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange?.(e.target.value)
  }
  return (
    <div className={cls(`${PREFIX}`, className)}>
      <FormControl sx={{ m: 1, width: 162, marginLeft: 2 }} size="small">
        <Select id="demo-select-small" value={value} onChange={handleChange}>
          {retailerList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
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
