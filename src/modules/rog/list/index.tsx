import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  // fetchBrands,
  selectAllCategories,
  // updateCommon,
} from '../../../store/commonSlice'
import {
  fetchBrands,
  selectSelectedCategoryIds,
  updateRog,
} from '../../../store/rogSlice'
import { BrandList } from './brand'
import { CategoryList } from '../../common/category/category'
import { RetailerList } from './retailer'

interface IProps {
  id?: string
}

const PREFIX = 'RogList'

export const RogList: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const selectedCategoryIds = useSelector(selectSelectedCategoryIds)

  const handleCategoryChange = (value: number[]) => {
    dispatch(updateRog({ selectedCategoryIds: value }))
    if (value.length) {
      dispatch(fetchBrands(value[0]) as any)
    } else {
      dispatch(updateRog({ brands: [] }))
    }
  }

  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>RETAILER</span>
      <RetailerList />
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList
        categories={categories}
        selected={selectedCategoryIds}
        onChange={handleCategoryChange}
      />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList />
    </div>
  )
}
