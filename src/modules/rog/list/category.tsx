import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IRetailer } from '../../../domain/retailer'
import {
  fetchBrands,
  selectAllCategories,
  selectSelectedCategoryIds,
  updateCommon,
} from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'CategoryList'

export const CategoryList: React.FC<IProps> = ({ list = [] }) => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const categoryIds = useSelector(selectSelectedCategoryIds)

  const handleChange = (value: number[]) => {
    dispatch(updateCommon({ selectedCategoryIds: value }))
    if (value.length) {
      dispatch(fetchBrands(value[0]) as any)
    } else {
      dispatch(updateCommon({ brands: [] }))
    }
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      <ToggleSelectorGroup
        value={categoryIds}
        onChange={handleChange}
        mode="SINGLE"
      >
        {categories.map((item) => (
          <ToggleSelectorItem value={item.id} key={item.id}>
            <BizUnit id={`${item.id}`} text={item.category_name} pure={true} />
          </ToggleSelectorItem>
        ))}
      </ToggleSelectorGroup>
    </div>
  )
}
