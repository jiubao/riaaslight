import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSelectedBrandIds,
  selectShelfBrands,
  selectShelfCategories,
  updateShelf,
} from '../../store/shelfSlice'
import { BrandList } from '../common/brand'
import { CategoryList } from '../common/category/category'

const PREFIX = 'ShelfDetailRight'
export const ShelfDetailRight: React.FC = () => {
  const dispatch = useDispatch()
  const selectedBrandIds = useSelector(selectSelectedBrandIds)
  const brands = useSelector(selectShelfBrands)
  const categories = useSelector(selectShelfCategories)

  const handleBrandChange = (selectedBrandIds: number[]) => {
    dispatch(updateShelf({ selectedBrandIds }))
  }

  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList categories={categories} />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList
        selected={selectedBrandIds}
        brands={brands}
        onChange={handleBrandChange}
      />
    </div>
  )
}
