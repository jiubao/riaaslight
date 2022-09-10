import React from 'react'
import { IStoreDetail } from '../../domain'
import { SvgIcon } from '@mui/material'
// import PlaceIcon from '@mui/icons-material/Place'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import DateRangeIcon from '@mui/icons-material/DateRange'
// import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { useNavigate } from 'react-router-dom'
import { parseStoreAddress } from '../../utils'

interface IProps {
  store: IStoreDetail
}

const PREFIX = 'RogStoreInfo'

export const StoreInfo: React.FC<IProps> = ({ store }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/store/${store.store_id}`)
  }

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-img`}>
        <img src={store.latest_thumbnail_url} alt="" />
      </div>
      <div className={`${PREFIX}-info`}>
        <div className={`${PREFIX}-name textNoWrap`} title={store.store_name}>
          {store.store_name}
        </div>
        <div
          className={`${PREFIX}-address flexMiddle`}
          title={parseStoreAddress(store)}
        >
          <SvgIcon component={PlaceOutlinedIcon} fontSize="small" />
          <span className="textNoWrap">{parseStoreAddress(store)}</span>
        </div>
        <div className={`${PREFIX}-date flexMiddle`}>
          <SvgIcon component={DateRangeIcon} fontSize="small" />
          {store.latest_img_at}
        </div>
        <div className={`${PREFIX}-more flexMiddle`} onClick={handleClick}>
          more photo
          <SvgIcon component={KeyboardArrowRightOutlinedIcon} />
        </div>
      </div>
    </div>
  )
}
