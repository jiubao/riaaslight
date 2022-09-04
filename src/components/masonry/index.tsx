import classNames from 'classnames'
import { isArray } from 'lodash'
import React, { useMemo } from 'react'
import './index.scss'

export const IMAGE_MIN_HEIGHT = 120

interface IProps {
  mode?: 'shrink' | 'normal'
  columnCount: number
  total: number
  gutter?: [number, number] | number
  children: ({ index }: { index: number }) => React.ReactNode
}

const PREFIX = 'Masonry'

export const Masonry: React.FC<IProps> = ({
  mode = 'shrink',
  columnCount,
  total,
  gutter = [8, 8],
  children,
}) => {
  const columns = useMemo(() => Array(columnCount).fill(1), [columnCount])

  const gutterX = useMemo(
    () => (isArray(gutter) ? gutter[0] : gutter),
    [gutter]
  )

  const gutterY = useMemo(
    () => (isArray(gutter) ? gutter[1] : gutter),
    [gutter]
  )

  const wrapStyle = useMemo(() => ({ marginLeft: `-${gutterX}px` }), [gutterX])

  const ulStyle = useMemo(
    () => ({
      flexBasis: `${100 / columnCount}%`,
      paddingLeft: `${gutterX}px`,
    }),
    [columnCount, gutterX]
  )

  const liStyle = useMemo(
    () => ({
      marginBottom: `${gutterY}px`,
      minHeight: mode === 'shrink' ? 'auto' : `${IMAGE_MIN_HEIGHT}px`,
    }),
    [gutterY, mode]
  )

  const renderColumn = (c: number) => {
    const rows = []
    let index = c
    while (index < total) {
      rows.push(
        <li style={liStyle} key={index}>
          {children({ index })}
        </li>
      )
      index += columnCount
    }
    return rows
  }

  return (
    <div
      className={classNames(PREFIX, { abc: mode === 'normal' })}
      style={wrapStyle}
    >
      {columns.map((_, index) => (
        <ul style={ulStyle} key={index}>
          {renderColumn(index)}
        </ul>
      ))}
    </div>
  )
}
