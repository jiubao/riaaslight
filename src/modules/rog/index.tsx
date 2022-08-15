import React from 'react'
import { MainMenu } from '../../components/menu'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'

export const Rog: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <MainMenu />
    </div>
  )
}
