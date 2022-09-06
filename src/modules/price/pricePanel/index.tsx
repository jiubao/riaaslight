import CloseIcon from '@mui/icons-material/Close'
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import cls from 'classnames'
import { pick } from 'lodash'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UriImageWithLoading } from '../../../components/UriImageWithLoading'
import { ISku } from '../../../domain'
import { selectAllRetailers } from '../../../store/commonSlice'
import {
  fetchPriceMap,
  leftRetailerSelector,
  priceInfo,
  rightRetailerSelector,
  updatePrice,
  updateSelectedDate,
} from '../../../store/priceSlice'
import PriceGraph from './graph'
import './index.scss'
import { IPriceItem } from './interface'
import PriceItem from './priceItem'

const PREFIX = 'PricePanel'

interface IProps {
  className?: string
  visible: boolean
  data?: ISku
  onClose: () => void
}

const PricePanel: React.FC<IProps> = React.memo(function PricePanel(props) {
  const { className, data, visible } = props

  const dispatch = useDispatch()
  const {
    loading,
    dateList,
    selectedDate,
    skuInfo,
    retailerPriceForSelectedDate,
  } = useSelector(priceInfo)
  const leftRetailer = useSelector(leftRetailerSelector)
  const rightRetailer = useSelector(rightRetailerSelector)
  const allRetailers = useSelector(selectAllRetailers)

  const priceItemList = useMemo(() => {
    return retailerPriceForSelectedDate.map((item) => {
      const retailer = allRetailers.find(
        (retailer) => retailer.id === Number(item.retailerId)
      )
      return {
        ...item,
        ...pick(retailer, ['retailer_name', 'retailer_icon', 'retailer_color']),
      } as IPriceItem
    })
  }, [allRetailers, retailerPriceForSelectedDate])

  // 更新数据
  useEffect(() => {
    if (data) {
      dispatch(fetchPriceMap(data) as any)
    }
  }, [visible])

  // 更新选中日期
  const handleDateChange = (e: SelectChangeEvent<string>) => {
    dispatch(updateSelectedDate(e.target.value))
  }

  const handleLeftGraphChange = useCallback((value: string) => {
    dispatch(
      updatePrice({
        leftRetailer: value,
      })
    )
  }, [])

  const handleRightGraphChange = useCallback((value: string) => {
    dispatch(
      updatePrice({
        rightRetailer: value,
      })
    )
  }, [])

  console.log('render pricePanel')
  return (
    <div className={cls(`${PREFIX}`, className, { visible })}>
      <div className={`${PREFIX}-content`}>
        {loading && <div className={`${PREFIX}-loading`}></div>}
        <IconButton
          className={`${PREFIX}-content-close`}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
        <div className={`${PREFIX}-price`}>
          <div className={`${PREFIX}-price-left`}>
            <UriImageWithLoading
              className={`${PREFIX}-headImage`}
              imageUri={skuInfo?.sku_cover_pic_url}
            />
          </div>
          <div className={`${PREFIX}-price-right`}>
            <div className="title">{skuInfo?.sku_name}</div>
            <div className="date">
              <span className="label">Price</span>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  id="demo-select-small"
                  value={selectedDate}
                  onChange={handleDateChange}
                >
                  {dateList.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={`${PREFIX}-price-list`}>
              {priceItemList.map((item) => (
                <PriceItem
                  className={`${PREFIX}-price-list-item`}
                  data={item}
                ></PriceItem>
              ))}
            </div>
          </div>
        </div>
        <div className={`${PREFIX}-trend`}>
          <span className="label">Price</span>
          <div className={`${PREFIX}-trend-content`}>
            <PriceGraph
              value={leftRetailer}
              onChange={handleLeftGraphChange}
              className={`${PREFIX}-trend-content-left`}
            ></PriceGraph>
            <PriceGraph
              value={rightRetailer}
              onChange={handleRightGraphChange}
              className={`${PREFIX}-trend-content-right`}
            ></PriceGraph>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PricePanel
