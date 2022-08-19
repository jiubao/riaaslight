import React from 'react'
import { BizUnit } from '../../../components/BizUnit'
import { Brands } from '../../../mock/retailer'
import { BrandList } from '../list/brand'
import { CategoryList } from '../list/category'

const PREFIX = 'RogDetailLeft'

export const RogDetailLeft: React.FC = () => {
  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList list={Brands} />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList list={Brands} />
      <span className={`${PREFIX}-title`}>PHOTO TYPE</span>
      <div className="BizUnit-list">
        <BizUnit text={'Shelf/ Cooler Photos'} pure={true} />
        <BizUnit text={'POSM'} pure={true} />
      </div>
    </div>
  )
}
