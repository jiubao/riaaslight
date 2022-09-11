import React from 'react'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { IPublisher } from '../../../domain'
import { PngIconType } from '../../../domain/icon'

const PREFIX = 'Publishers'

interface IProps {
  all: IPublisher[]
  value: number[]
  onChange: (value: number[]) => void
}

export const Publishers: React.FC<IProps> = React.memo(function Publishers({
  all,
  value,
  onChange,
}) {
  return (
    <div className={PREFIX}>
      <ToggleSelectorGroup value={value} onChange={onChange}>
        {all.map((item) => (
          <ToggleSelectorItem value={item.id} key={item.id}>
            <BizUnit
              id={String(item.id)}
              text={item.publisher_name}
              icon={item.publisher_icon}
              type={PngIconType.Publisher}
            />
          </ToggleSelectorItem>
        ))}
      </ToggleSelectorGroup>
    </div>
  )
})
