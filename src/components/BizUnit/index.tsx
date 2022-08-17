import React from 'react'
import './index.scss'

interface IProps {
  text: string
  base64?: string
  pure?: boolean
}

const PREFIX = 'BizUnit'

export const BizUnit: React.FC<IProps> = ({ text, base64, pure = false }) => {
  return (
    <div className={PREFIX}>
      {!pure && base64 && <img src={base64} alt="" />}
      <span>{text}</span>
    </div>
  )
}
