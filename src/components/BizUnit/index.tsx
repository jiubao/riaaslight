import React from 'react'
import './index.scss'

interface IProps {
  id?: string
  text: string
  base64?: string | null
  pure?: boolean
  onClick?: (id?: string) => void
}

const PREFIX = 'BizUnit'

export const BizUnit: React.FC<IProps> = ({
  id,
  text,
  base64,
  pure = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(id)
  }
  return (
    <div className={PREFIX} onClick={handleClick}>
      {!pure && base64 && <img src={base64} alt="" />}
      <span>{text}</span>
    </div>
  )
}
