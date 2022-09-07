import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import './index.scss'

interface IProps {
  srcs: string[]
  index: number
  onClick?: (index: number) => void
  size?: number
}

const PREFIX = 'Slider'

export const Slider: React.FC<IProps> = ({
  srcs,
  index,
  onClick,
  size = 7,
}) => {
  const [partial, setPartial] = useState<string[]>([])
  const [current, setCurrent] = useState(-1)
  useEffect(() => {
    const total = srcs.length
    if (total < size) {
      setPartial(srcs)
      setCurrent(index)
    } else {
      const middle = ~~(size / 2)
      let value = middle
      let start = index - middle
      if (index < middle) {
        start = 0
        value = index
      } else if (index + middle >= total) {
        start = total - size
        value = size - (total - index)
      }
      const next = srcs.slice(start, start + size)
      setPartial(next)
      // setCurrent(next.indexOf(srcs[index]))
      console.log(index, value)
      setCurrent(value)
    }
  }, [srcs, index, size])

  const handleClick = (src: string) => {
    onClick?.(srcs.indexOf(src))
  }

  return (
    <div className={PREFIX}>
      {partial.map((src, index) => (
        <div key={index} className={`${PREFIX}-item`}>
          <div
            onClick={() => handleClick(src)}
            className={classNames(`${PREFIX}-wrap`, {
              'is-active': index === current,
            })}
          >
            <img src={src} alt="" />
          </div>
        </div>
      ))}
    </div>
  )
}
