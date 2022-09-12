import React from 'react'

interface IProps {
  id?: string
}

const PREFIX = 'ZoomWindow'

export const ZoomWindow: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <div>{id}</div>
    </div>
  )
}
