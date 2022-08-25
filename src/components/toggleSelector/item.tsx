import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { useStateContext } from './context'

const PREFIX = 'ToggleSelector'

interface ICheckBoxProps<T> {
  className?: string
  value: T
}

export const ToggleSelectorItem = <T extends number | string>({
  className,
  children,
  value,
}: PropsWithChildren<ICheckBoxProps<T>>) => {
  const { disabled, value: values, click } = useStateContext<T>()

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return
    click(value)
    event.stopPropagation()
  }

  return (
    <div
      className={classNames(`${PREFIX}-item`, className, {
        isChecked: values.includes(value),
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
