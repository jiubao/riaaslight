import React from 'react'
import { BrandList } from '../list/brand'
import { CategoryList } from '../../common/category/category'

const PREFIX = 'StoreGalleryRight'
export const StoreGalleryRight: React.FC = () => {
  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList />
    </div>
  )
}
