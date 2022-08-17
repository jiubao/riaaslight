import React from 'react'

interface IProps {
  id?: string
}

const PREFIX = 'RogList'

export const RogList: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <div>rog</div>
    </div>
  )
}
