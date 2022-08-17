import React from 'react'
import { BizUnit } from '../../../components/BizUnit'
import { IRetailer } from '../../../domain/retailer'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'BrandList'

export const BrandList: React.FC<IProps> = ({ list = [] }) => {
  return (
    <div className={`${PREFIX} BizUnit-list`}>
      {list.map((item) => (
        <BizUnit key={item.id} text={item.name} base64={item.picture} />
      ))}
    </div>
  )
}
