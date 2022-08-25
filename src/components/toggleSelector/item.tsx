import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { useStateContext } from './context'

const PREFIX = 'HoverCheckBox'

interface ICheckBoxProps<T> {
  className?: string
  value: T
  onClick?: (item: T) => void
}

export const ToggleSelectorItem = <T extends number | string>({
  className,
  children,
  value,
}: PropsWithChildren<ICheckBoxProps<T>>) => {
  const { disabled, checkedKeys, click } = useStateContext<T>()

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disabled) return
    click(value)
    // 避免二次触发下面的handleClick
    event.stopPropagation()
  }

  return (
    <div
      className={classNames(`${PREFIX}-hoverCheckBox`, className, {
        'isChecked': checkedKeys.indexOf(value) < 0
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
