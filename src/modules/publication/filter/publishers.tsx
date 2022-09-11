import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { PngIconType } from '../../../domain/icon'
import {
  selectPublishers,
  selectSelectedPublisherIds,
  updatePublication,
} from '../../../store/publicationSlice'

const PREFIX = 'Publishers'

export const Publishers: React.FC = React.memo(function Publishers() {
  const dispatch = useDispatch()
  const publishers = useSelector(selectPublishers)
  const selected = useSelector(selectSelectedPublisherIds)

  const handleChange = useCallback(
    (value: number[]) => {
      dispatch(updatePublication({ selectedPublisherIds: value }))
    },
    [dispatch]
  )

  return (
    <div className={PREFIX}>
      <ToggleSelectorGroup value={selected} onChange={handleChange}>
        {publishers.map((item) => (
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
