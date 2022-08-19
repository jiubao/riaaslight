import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BizUnit } from '../../../components/BizUnit'
import { IRetailer } from '../../../domain/retailer'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'RetailerList'

export const RetailerList: React.FC<IProps> = ({ list = [] }) => {
  const navigate = useNavigate()

  const gotoDetail = (id?: string) => {
    id !== undefined && navigate(`/rog/${id}`)
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      {list.map((item) => (
        <BizUnit
          key={item.id}
          id={item.id}
          text={item.name}
          base64={item.picture}
          onClick={gotoDetail}
        />
      ))}
    </div>
  )
}
