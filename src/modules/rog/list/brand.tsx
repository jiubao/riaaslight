import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IRetailer } from '../../../domain/retailer'
import { selectAllBrands } from '../../../store/commonSlice'

interface IProps {
  list: IRetailer[]
}

const PREFIX = 'BrandList'

export const BrandList: React.FC<IProps> = ({ list = [] }) => {
  const brands = useSelector(selectAllBrands)
  const [value, setValue] = useState<number[]>([])
  const handleChange = (ids: number[]) => {
    setValue(ids)
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      <ToggleSelectorGroup value={value} onChange={handleChange}>
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
