import React from 'react'
import { Brands } from '../../../mock/retailer'
import { BrandList } from './brand'
import { CategoryList } from './category'
import { RetailerList } from './retailer'

interface IProps {
  id?: string
}

const PREFIX = 'RogList'

export const RogList: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>RETAILER</span>
      <RetailerList />
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList list={Brands} />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList list={Brands} />
    </div>
  )
}
