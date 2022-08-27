import React from 'react'
import { IStoreDetail } from '../../domain'
import { SvgIcon } from '@mui/material'
// import PlaceIcon from '@mui/icons-material/Place'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import DateRangeIcon from '@mui/icons-material/DateRange'
// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

interface IProps {
  store: IStoreDetail
}

const PREFIX = 'StoreInfo'

export const StoreInfo: React.FC<IProps> = ({ store }) => {
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-img`}>
        <img src={store.latest_preview_img_url} alt="" />
      </div>
      <div className={`${PREFIX}-info`}>
        <div className={`${PREFIX}-name`}>{store.store_name}</div>
        <div className={`${PREFIX}-address flexMiddle`}>
          <SvgIcon component={PlaceOutlinedIcon} fontSize="small" />
          {store.store_address}
        </div>
        <div className={`${PREFIX}-date flexMiddle`}>
          <SvgIcon component={DateRangeIcon} fontSize="small" />
          {store.latest_img_at}
        </div>
        <div className={`${PREFIX}-more flexMiddle`}>
          more photo
          <SvgIcon component={KeyboardArrowRightOutlinedIcon} />
        </div>
      </div>
    </div>
  )
}
