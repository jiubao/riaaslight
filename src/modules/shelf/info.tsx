import React from 'react'
import { IShelfShot, IStoreDetail } from '../../domain'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

interface IProps {
  shelfShot?: IShelfShot
  store?: IStoreDetail
}

const PREFIX = 'ShelfDetailInfo'

export const ShelfShotInfo: React.FC<IProps> = ({ shelfShot, store }) => {
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-time flexMiddle`}>
        <AccessTimeIcon />
        Photo time: {shelfShot?.visit_date}
      </div>
      <div className={`${PREFIX}-right`}>
        <div className={`${PREFIX}-storeName`}>{store?.store_name}</div>
        <div className={`${PREFIX}-address flexMiddle`}>
          <LocationOnOutlinedIcon />
          {`${store?.store_address}, ${store?.store_city}, ${store?.store_country}`}
        </div>
      </div>
    </div>
  )
}
