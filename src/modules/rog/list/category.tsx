import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import {
  fetchBrands,
  selectAllCategories,
  updateCommon,
} from '../../../store/commonSlice'
import { selectSelectedCategoryIds, updateRog } from '../../../store/rogSlice'

const PREFIX = 'CategoryList'

export const CategoryList: React.FC = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const categoryIds = useSelector(selectSelectedCategoryIds)

  const handleChange = (value: number[]) => {
    dispatch(updateRog({ selectedCategoryIds: value }))
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
