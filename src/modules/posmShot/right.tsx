import React from 'react'
import { useSelector } from 'react-redux'
import { selectPosmShotDetailBrands } from '../../store/posmShotSlice'
import { BrandList } from '../common/brand'

interface IProps {
  id?: string
}

const PREFIX = 'PosmShotDetailRight'

export const PosmShotDetailRight: React.FC<IProps> = ({ id }) => {
  const brands = useSelector(selectPosmShotDetailBrands)

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-title`}>BRAND</div>
      <div className={`${PREFIX}-brands`}>
        <BrandList brands={brands} />
      </div>
    </div>
  )
}
