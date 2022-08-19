import { isArray } from 'lodash'
import React, { useMemo } from 'react'
import './index.scss'

interface IProps {
  columnCount: number
  total: number
  gutter?: [number, number] | number
  children: ({ index }: { index: number }) => React.ReactNode
}

const PREFIX = 'Gallery'

export const Gallery: React.FC<IProps> = ({
  columnCount,
  total,
  gutter = [8, 8],
  children,
}) => {
  const columns = useMemo(() => Array(columnCount).fill(1), [columnCount])

  const gutterX = useMemo(
    () => (isArray(gutter) ? gutter[0] : gutter) / 2,
    [gutter]
  )

  const gutterY = useMemo(
    () => (isArray(gutter) ? gutter[1] : gutter),
    [gutter]
  )

  const wrapStyle = useMemo(() => ({ margin: `0 -${gutterX}px` }), [gutterX])

  const ulStyle = useMemo(
    () => ({ width: `${100 / columnCount}%`, padding: `0 ${gutterX}px` }),
    [columnCount, gutterX]
  )

  const liStyle = useMemo(() => ({ paddingBottom: `${gutterY}px` }), [gutterY])

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
    <div className={PREFIX} style={wrapStyle}>
      {columns.map((_, index) => (
        <ul style={ulStyle} key={index}>
          {renderColumn(index)}
        </ul>
      ))}
    </div>
  )
}
