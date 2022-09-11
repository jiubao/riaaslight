import React from 'react'
import { useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import { PngIconType } from '../../../domain/icon'
import { selectPublishers } from '../../../store/publicationSlice'

const PREFIX = 'Publishers'

export const Publishers: React.FC = () => {
  const publishers = useSelector(selectPublishers)
  return (
    <div className={PREFIX}>
      {publishers.map((publisher) => (
        <BizUnit
          key={publisher.id}
          id={String(publisher.id)}
          text={publisher.publisher_name}
          icon={publisher.publisher_icon}
          type={PngIconType.Publisher}
        />
      ))}
    </div>
  )
}
