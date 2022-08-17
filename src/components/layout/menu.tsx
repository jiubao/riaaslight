import classNames from 'classnames'
import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

interface IProps {
  text: string
  icon?: React.ReactNode
  to: string
  className?: string
}

const PREFIX = 'MenuButton'

export const MenuButton: React.FC<IProps> = ({ text, icon, to, className }) => {
  const navigate = useNavigate()
  const match = useMatch(to)
  // const matchPosm = useMatch('/posm')

  const handleClick = () => {
    navigate(to)
  }

  return (
    <div
      className={classNames(PREFIX, className, { selected: match })}
      onClick={handleClick}
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}
