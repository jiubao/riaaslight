import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import './index.scss'

interface IProps {
  total: number
  index: number
  size?: number
  children: ({
    index,
    active,
  }: {
    index: number
    active: boolean
  }) => React.ReactNode
}

const PREFIX = 'Slider'

export const Slider: React.FC<IProps> = ({
  total,
  index,
  size = 7,
  children,
}) => {
  const [current, setCurrent] = useState(0)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  useEffect(() => {
    if (total < size) {
      setStart(0)
      setEnd(total - 1)
      setCurrent(index)
    } else {
      const middle = ~~(size / 2)
      if (index < middle) {
        setStart(0)
        setEnd(size - 1)
        setCurrent(index)
      } else if (index + middle >= total) {
        setStart(total - size)
        setEnd(total - 1)
        setCurrent(size - (total - index))
      } else {
        const s = index - middle
        setStart(s)
        setEnd(s + size - 1)
        setCurrent(middle)
      }
    }
  }, [index, size, total])

  if (index < 0) return null

  return (
    <div className={PREFIX}>
      {Array(end - start + 1)
        .fill(1)
        .map((_, i) => (
          <div key={i} className={`${PREFIX}-item`}>
            <div
              className={classNames(`${PREFIX}-wrap`, {
                'is-active': i === current,
              })}
            >
              {children({ index: i + start, active: i === current })}
            </div>
          </div>
        ))}
    </div>
  )
}
