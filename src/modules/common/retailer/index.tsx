import React, { useCallback } from 'react'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IRetailer } from '../../../domain'
import { PngIconType } from '../../../domain/icon'
import './index.scss'

const PREFIX = 'RetailerList'

interface IProps {
  retailers?: IRetailer[]
  selected?: number[]
  onChange?: (value: number[]) => void
}

export const RetailerList: React.FC<IProps> = React.memo(
  ({ selected = [], retailers = [], onChange }) => {
    const handleChange = useCallback(
      (value: number[]) => {
        onChange?.(value)
      },
      [onChange]
    )

    return (
      <div className={`${PREFIX} BizUnit-list`}>
        <ToggleSelectorGroup value={selected} onChange={handleChange}>
          {retailers.map((item) => (
            <ToggleSelectorItem value={item.id} key={item.id}>
              <BizUnit
                id={String(item.id)}
                text={item.retailer_name}
                type={PngIconType.Retailer}
              />
            </ToggleSelectorItem>
          ))}
        </ToggleSelectorGroup>
      </div>
    )
  }
)
