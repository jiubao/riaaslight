import React from 'react'

interface IProps {
  id?: string
}

const PREFIX = 'Posm'

export const Posm: React.FC<IProps> = ({ id }) => {
  return <div className={PREFIX}>posm</div>
}
