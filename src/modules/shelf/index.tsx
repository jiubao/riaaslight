import React from 'react'
import { LR } from '../../components/layout/lr'
import './index.scss'
import { ShelfDetailRight } from './right'
import { ShelfDetailLeft } from './left'
// import { useWindowResize } from '../../hooks/useWindowResize'

const PREFIX = 'ShelfDetail'

interface IProps {
  onClose?: () => void
}

export const ShelfDetail: React.FC<IProps> = ({ onClose }) => {
  // const [style, setStyle] = useState<CSSProperties>()

  // useWindowResize(() => {
  //   setStyle({ height: window.innerHeight - 90 })
  // }, [])

  return (
    <LR
      className={PREFIX}
      // style={style}
      percent={77}
      left={<ShelfDetailLeft />}
    >
      <ShelfDetailRight onClose={onClose} />
    </LR>
  )
}
