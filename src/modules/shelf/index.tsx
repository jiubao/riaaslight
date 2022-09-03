import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { LR } from '../../components/layout/lr'
import './index.scss'
import { ShelfDetailRight } from './right'
import { ShelfDetailLeft } from './left'
import { on } from '../../utils/dom'

const PREFIX = 'ShelfDetail'

interface IProps {
  onClose?: () => void
}

export const ShelfDetail: React.FC<IProps> = ({ onClose }) => {
  const [height, setHeight] = useState(0)
  const style = useMemo(() => ({ height: height - 90 }), [height])

  const resize = useCallback(() => {
    console.log(window.innerHeight)
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    resize()
  }, [resize])

  useEffect(() => {
    const off = on(window, 'resize', () => {
      resize()
    })
    return () => {
      off()
    }
  }, [resize])

  return (
    <LR
      className={PREFIX}
      style={style}
      percent={77}
      left={<ShelfDetailLeft />}
    >
      <ShelfDetailRight onClose={onClose} />
    </LR>
  )
}
