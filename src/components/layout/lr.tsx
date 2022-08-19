import classNames from 'classnames'
import React, { PropsWithChildren, ReactNode, useMemo } from 'react'
import { PropsWithClassName } from '../../domain/common'
import './lr.scss'

interface IProps {
  left: ReactNode
  percent?: number
}

const PREFIX = 'LR'

export const LR: React.FC<PropsWithChildren<PropsWithClassName<IProps>>> = ({
  left,
  percent = 50,
  className,
  children,
}) => {
  const leftStyle = useMemo(() => ({ width: `${percent}%` }), [percent])
  const rightStyle = useMemo(() => ({ width: `${100 - percent}%` }), [percent])

  return (
    <div className={classNames(PREFIX, className)}>
      <div className={`${PREFIX}-left`} style={leftStyle}>
        {left}
      </div>
      <div className={`${PREFIX}-right`} style={rightStyle}>
        {children}
      </div>
    </div>
  )
}
