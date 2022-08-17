import React from 'react'

interface IProps {
  id: string
}

const PREFIX = 'demo'

export const Demo: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <div>{id}</div>
    </div>
  )
}
