import React from 'react'
import './index.scss'

const PREFIX = 'WaterFallNoMoreDataRow'

interface IProps {
  className?: string
  style: React.CSSProperties
}

const WaterFallNoMoreDataRow: React.FC<IProps> = React.memo(
  function WaterFallNoMoreDataRow(props) {
    const { style } = props
    return (
      <div style={style} className={`${PREFIX}-noMoreData`}>
        <span className={`${PREFIX}-noMoreDataLine`}></span>
        <span className={`${PREFIX}-noMoreDataDesc`}>End</span>
        <span className={`${PREFIX}-noMoreDataLine`}></span>
      </div>
    )
  }
)

export default WaterFallNoMoreDataRow
