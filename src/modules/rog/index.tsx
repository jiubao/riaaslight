import React from 'react'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'

export const Rog: React.FC<IProps> = ({ id }) => {
  return <div className={PREFIX}>rog</div>
}
