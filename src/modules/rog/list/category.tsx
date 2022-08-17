import React from 'react'
import { BizUnit } from '../../../components/BizUnit'
import { IRetailer } from '../../../domain/retailer'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'CategoryList'

export const CategoryList: React.FC<IProps> = ({ list = [] }) => {
  return (
    <div className={`${PREFIX} BizUnit-list`}>
      {list.map((item) => (
        <BizUnit key={item.id} text={item.name} pure={true} />
      ))}
    </div>
  )
}
