import React from 'react'
import { PngIconType } from '../../domain/icon'
import { PNGIcon } from '../icons/pngIcon'
import './index.scss'

interface IProps {
  id?: string
  text: string
  icon?: string | null
  // base64?: string | null
  type?: PngIconType
  // pure?: boolean
  onClick?: (id?: string) => void
}

const PREFIX = 'BizUnit'

export const BizUnit: React.FC<IProps> = ({
  id,
  text,
  icon,
  type,
  // pure = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id)
  }
  return (
    <div className={PREFIX} onClick={handleClick}>
      {type && <PNGIcon name={icon} type={type} />}
      <span>{text}</span>
    </div>
  )
}
