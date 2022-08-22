import React from 'react'
import { Brands } from '../../../mock/retailer'
import { BrandList } from '../list/brand'
import { CategoryList } from '../list/category'

const PREFIX = 'StoreGalleryRight'
export const StoreGalleryRight: React.FC = () => {
  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList list={Brands} />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList list={Brands} />
    </div>
  )
}
