import React from 'react'
import { useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import { IRetailer } from '../../../domain/retailer'
import { selectAllBrands } from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'BrandList'

export const BrandList: React.FC<IProps> = ({ list = [] }) => {
  const brands = useSelector(selectAllBrands)

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      {brands.map((brand) => (
        <BizUnit
          key={brand.id}
          id={String(brand.id)}
          text={brand.brand_name}
          base64={brand.brand_icon || ''}
        />
      ))}
    </div>
  )
}
