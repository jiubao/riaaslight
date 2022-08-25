import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IRetailer } from '../../../domain/retailer'
import { selectAllCategories } from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'CategoryList'

export const CategoryList: React.FC<IProps> = ({ list = [] }) => {
  const categories = useSelector(selectAllCategories)
  const [keys, setKeys] = useState<number[]>([])

  const handleChange = (value: number[]) => {
    setKeys(value)
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      <ToggleSelectorGroup value={keys} onChange={handleChange} mode="SINGLE">
        {categories.map((item) => (
          <ToggleSelectorItem value={item.id} key={item.id}>
            <BizUnit id={`${item.id}`} text={item.category_name} pure={true} />
          </ToggleSelectorItem>
        ))}
      </ToggleSelectorGroup>
    </div>
  )
}
