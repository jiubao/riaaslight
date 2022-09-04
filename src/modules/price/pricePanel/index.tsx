import React, { useEffect, useCallback } from 'react'
import cls from 'classnames'
import CloseIcon from '@mui/icons-material/Close'
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material'
import { UriImageWithLoading } from '../../../components/UriImageWithLoading'
import './index.scss'
import {
  fetchPriceMap,
  leftRetailerSelector,
  priceInfo,
  rightRetailerSelector,
  updatePrice,
  updateSelectedDate,
} from '../../../store/priceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ISku } from '../../../domain'
import PriceItem from './priceItem'
import PriceGraph from './graph'
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
  const { loading, dateList, selectedDate, retailerPriceForSelectedDate } =
    useSelector(priceInfo)
  const leftRetailer = useSelector(leftRetailerSelector)
  const rightRetailer = useSelector(rightRetailerSelector)
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
              imageUri={''}
            />
          </div>
          <div className={`${PREFIX}-price-right`}>
            <div className="title">
              Pampers Diapers Size 7, 88 Count - Pampers Pull On Cruisers 360°
              Fit Disposable Baby Diapers with Stretchy Waistband
            </div>
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
              {retailerPriceForSelectedDate.map((item) => (
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
