import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import './index.scss'

interface IProps {
  srcs: string[]
  index: number
  onClick?: (index: number) => void
}

const PREFIX = 'Slider'

export const Slider: React.FC<IProps> = ({ srcs, index, onClick }) => {
  const [partial, setPartial] = useState<string[]>([])
  const [current, setCurrent] = useState(-1)
  useEffect(() => {
    const next: string[] = []
    let length = 6
    for (let i = 1; i <= 3; i++) {
      if (index - i < 0) break
      next.unshift(srcs[index - i])
      --length
    }

    setCurrent(next.length)
    next.push(srcs[index])
    for (let i = 1; i <= srcs.length; i++) {
      if (index + i >= srcs.length || length === 0) break
      next.push(srcs[index + i])
      --length
    }
    setPartial(next)
  }, [srcs, index])

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
