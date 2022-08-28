import React, { useCallback } from 'react'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IBrand } from '../../../domain'
import './index.scss'

const PREFIX = 'BrandList'

interface IProps {
  selected?: number[]
  brands?: IBrand[]
  onChange?: (value: number[]) => void
}

export const BrandList: React.FC<IProps> = React.memo(
  ({ selected = [], brands = [], onChange }) => {
    const handleChange = useCallback(
      (value: number[]) => {
        onChange?.(value)
      },
      [onChange]
    )

    return (
      <div className={`${PREFIX} BizUnit-list`}>
        <ToggleSelectorGroup value={selected} onChange={handleChange}>
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
)
