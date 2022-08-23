import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BizUnit } from '../../../components/BizUnit'
import { IRetailer } from '../../../domain/retailer'
import { selectAllRetailers } from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'RetailerList'

export const RetailerList: React.FC<IProps> = ({ list = [] }) => {
  const navigate = useNavigate()
  const retailers = useSelector(selectAllRetailers)

  const gotoDetail = (id?: string) => {
    id !== undefined && navigate(`/retailer/${id}`)
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      {retailers.map((item) => (
        <BizUnit
          key={item.id}
          id={String(item.id)}
          text={item.retailer_name}
          base64={item.retailer_icon}
          onClick={gotoDetail}
        />
      ))}
    </div>
  )
}
