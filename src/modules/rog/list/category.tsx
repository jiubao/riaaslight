import React from 'react'
import { useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import { IRetailer } from '../../../domain/retailer'
import { selectAllCategories } from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'CategoryList'

export const CategoryList: React.FC<IProps> = ({ list = [] }) => {
  const categories = useSelector(selectAllCategories)

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      {categories.map((item) => (
        <BizUnit
          key={item.id}
          id={`${item.id}`}
          text={item.category_name}
          pure={true}
        />
      ))}
    </div>
  )
}
