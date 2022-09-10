import CloseIcon from '@mui/icons-material/Close'
import {
  CircularProgress,
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

function toFixed(value: string, count: number) {
  if (typeof value !== 'string') return ''
  const [integer, decimal] = value?.split('.')
  if (decimal) {
    if (decimal.length < count) {
      return integer + '.' + (decimal + '000').slice(0, count)
    }
    return value
  } else {
    return integer + '.00'
  }
}

const PricePanel: React.FC<IProps> = React.memo(function PricePanel(props) {
  const { className, data, visible } = props

  const dispatch = useDispatch()
  const {
    loading,
    dateList,
    selectedDate,
    skuInfo,
    priceMap,
    retailerPriceForSelectedDate,
  } = useSelector(priceInfo)
  const leftRetailer = useSelector(leftRetailerSelector)
  const rightRetailer = useSelector(rightRetailerSelector)
  const allRetailers = useSelector(selectAllRetailers)

  // 计算左右图中的最大值和最小值
  const { maxPrice, minPrice } = useMemo(() => {
    try {
      const leftPriceMap = priceMap[leftRetailer] || {}
      const rightPriceMap = priceMap[rightRetailer] || {}
      const leftMaxPricies = Object.keys(leftPriceMap).map(
        (date) => leftPriceMap?.[date]?.max_price || 0
      )
      const rightMaxPricies = Object.keys(rightPriceMap).map(
        (date) => rightPriceMap?.[date]?.max_price || 0
      )
      const leftMinPricies = Object.keys(leftPriceMap).map(
        (date) => leftPriceMap?.[date]?.min_price || 0
      )
      const rightMinPricies = Object.keys(rightPriceMap).map(
        (date) => rightPriceMap?.[date]?.min_price || 0
      )

      const maxPrice = Math.max(...leftMaxPricies, ...rightMaxPricies, 0)
      const minPrice = Math.min(...leftMinPricies, ...rightMinPricies, 1)
      return { maxPrice: Math.ceil(maxPrice), minPrice: Math.floor(minPrice) }
    } catch (error) {
      return { maxPrice: 0, minPrice: 0 }
    }
  }, [priceMap, leftRetailer, rightRetailer])
  const priceItemList = useMemo(() => {
    return retailerPriceForSelectedDate.map((item) => {
      const retailer = allRetailers.find(
        (retailer) => retailer.id === Number(item.retailerId)
      )
      return {
        ...item,
        min: toFixed(item.min_price + '', 2),
        max: toFixed(item.max_price + '', 2),
        ...pick(retailer, ['retailer_name', 'retailer_icon', 'retailer_color']),
      } as IPriceItem & { min: string; max: string }
    })
  }, [allRetailers, retailerPriceForSelectedDate])

  // 更新数据
  useEffect(() => {
    if (data) {
      dispatch(fetchPriceMap(data) as any)
    }
  }, [visible, dispatch, data])

  // 更新选中日期
  const handleDateChange = (e: SelectChangeEvent<string>) => {
    dispatch(updateSelectedDate(e.target.value))
  }

  const handleLeftGraphChange = useCallback(
    (value: string) => {
      dispatch(
        updatePrice({
          leftRetailer: value,
        })
      )
    },
    [dispatch]
  )

  const handleRightGraphChange = useCallback(
    (value: string) => {
      dispatch(
        updatePrice({
          rightRetailer: value,
        })
      )
    },
    [dispatch]
  )

  return (
    <div className={cls(`${PREFIX}`, className, { visible })}>
      <div className={`${PREFIX}-content`}>
        {loading && (
          <div className={`${PREFIX}-loading`}>
            <CircularProgress />
          </div>
        )}
        <IconButton
          className={`${PREFIX}-content-close`}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
        {Object.keys(priceMap).length ? (
          <>
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
                  <Select
                    className={`${PREFIX}-date-select`}
                    size="small"
                    value={selectedDate}
                    onChange={handleDateChange}
                  >
                    {dateList.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={`${PREFIX}-price-list`}>
                  {priceItemList.map((item) => (
                    <PriceItem
                      key={item.retailerId}
                      className={`${PREFIX}-price-list-item`}
                      data={item}
                    ></PriceItem>
                  ))}
                </div>
              </div>
            </div>
            <div className={`${PREFIX}-trend`}>
              <span className="label">Price Trends</span>
              <div className={`${PREFIX}-trend-content`}>
                <PriceGraph
                  value={leftRetailer}
                  yMax={maxPrice}
                  yMin={minPrice}
                  onChange={handleLeftGraphChange}
                  className={`${PREFIX}-trend-content-left`}
                ></PriceGraph>
                <PriceGraph
                  value={rightRetailer}
                  yMax={maxPrice}
                  yMin={minPrice}
                  onChange={handleRightGraphChange}
                  className={`${PREFIX}-trend-content-right`}
                ></PriceGraph>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
})

export default PricePanel
