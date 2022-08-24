import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { IDocument } from '../../domain'
import { useStateContext } from './context'

const PREFIX = 'HoverCheckBox'

interface ICheckBoxProps<T> {
  className?: string
  checkable?: boolean
  item: T
  onClick?: (item: T) => void
}

export const HoverCheckBoxTypeWorkaround = <T extends IDocument>({
  className,
  children,
  checkable = true,
  item,
  onClick,
}: PropsWithChildren<ICheckBoxProps<T>>) => {
  const { disabled, isSelecting, checkedKeys, click } = useStateContext<T>()

  const handleCheckBoxClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    click(item['id'])
    // 避免二次触发下面的handleClick
    event.stopPropagation()
  }
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isSelecting) {
      checkable && handleCheckBoxClick(event)
    } else {
      onClick && onClick(item)
    }
  }

  return (
    <div
      className={classNames(`${PREFIX}-hoverCheckBox`, className, {
        'is-selecting': isSelecting,
      })}
      onClick={handleClick}
    >
      {children}
      {/* {checkable && !disabled && (isHover || isSelecting) ? (
        <CheckBox
          onClick={handleCheckBoxClick}
          isHover={isHover && isSelecting}
          checked={checkedKeys.includes(item[itemKey])}
        />
      ) : null} */}
    </div>
  )
}
