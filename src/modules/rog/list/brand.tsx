import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IRetailer } from '../../../domain/retailer'
import {
  selectAllBrands,
  selectSelectedBrandIds,
  updateCommon,
} from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'BrandList'

export const BrandList: React.FC<IProps> = ({ list = [] }) => {
  const dispatch = useDispatch()
  const brands = useSelector(selectAllBrands)
  const brandIds = useSelector(selectSelectedBrandIds)
  const handleChange = (value: number[]) => {
    dispatch(updateCommon({ selectedBrandIds: value }))
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      <ToggleSelectorGroup value={brandIds} onChange={handleChange}>
        {brands.map((item) => (
          <ToggleSelectorItem value={item.id} key={item.id}>
            <BizUnit
              id={String(item.id)}
              text={item.brand_name}
              base64={item.brand_icon}
            />
          </ToggleSelectorItem>
        ))}
      </ToggleSelectorGroup>
    </div>
  )
}
