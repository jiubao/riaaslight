import React, { useMemo } from 'react'
import './index.scss'

interface IProps {
  columnCount: number
  total: number
  gutter?: [number, number]
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
  const wrapStyle = useMemo(
    () => ({ margin: `0 -${gutter[0] / 2}px` }),
    [gutter]
  )

  const ulStyle = useMemo(
    () => ({ width: `${100 / columnCount}%`, padding: `0 ${gutter[0] / 2}px` }),
    [columnCount, gutter]
  )

  const liStyle = useMemo(() => ({ paddingBottom: `${gutter[1]}px` }), [gutter])

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
