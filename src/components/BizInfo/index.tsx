import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import './index.scss'

interface IProps {
  date?: string
  name?: string
  address?: string
}

const PREFIX = 'BizInfo'

export const BizInfo: React.FC<IProps> = ({ date, name, address }) => {
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-time flexMiddle`}>
        <AccessTimeIcon />
        {/* Photo time: {shelfShot?.visit_date} */}
        Photo time: {date}
      </div>
      <div className={`${PREFIX}-right`}>
        <div className={`${PREFIX}-storeName`}>{name}</div>
        <div className={`${PREFIX}-address flexMiddle`}>
          <LocationOnOutlinedIcon />
          {/* {`${store?.store_address}, ${store?.store_city}, ${store?.store_country}`} */}
          {address}
        </div>
      </div>
    </div>
  )
}
