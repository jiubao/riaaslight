import React from 'react'
import { IPublication } from '../../domain'

interface IProps {
  data: IPublication
}

const PREFIX = 'PublicationItem'

export const PublicationItem: React.FC<IProps> = ({ data }) => {
  const handleClick = () => {
    //
  }
  return (
    <div className={PREFIX} onClick={handleClick}>
      <img src={data.cover_url} alt="" />
    </div>
  )
}
