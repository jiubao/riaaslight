import React from 'react'
import './index.scss'

const PREFIX = 'WaterFallLoadingRow'

interface IProps {
  className?: string
  style: React.CSSProperties
}

const WaterFallLoadingRow: React.FC<IProps> = React.memo(
  function WaterFallLoadingRow(props) {
    const { style } = props
    return (
      <div style={style} className={`${PREFIX}-loading`}>
        <span>loading...</span>
      </div>
    )
  }
)

export default WaterFallLoadingRow
