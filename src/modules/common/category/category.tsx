import React, { useCallback } from 'react'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { ICategory } from '../../../domain'
import './index.scss'

const PREFIX = 'CategoryList'

interface IProps {
  categories?: ICategory[]
  selected?: number[]
  onChange?: (value: number[]) => void
}

export const CategoryList: React.FC<IProps> = React.memo(
  ({ selected = [], categories = [], onChange }) => {
    const handleChange = useCallback(
      (value: number[]) => {
        onChange?.(value)
      },
      [onChange]
    )

    return (
      <div className={`${PREFIX} BizUnit-list`}>
        <ToggleSelectorGroup
          value={selected}
          onChange={handleChange}
          mode="SINGLE"
        >
          {categories.map((item) => (
            <ToggleSelectorItem value={item.id} key={item.id}>
              <BizUnit id={`${item.id}`} text={item.category_name} />
            </ToggleSelectorItem>
          ))}
        </ToggleSelectorGroup>
      </div>
    )
  }
)
