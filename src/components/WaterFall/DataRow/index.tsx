import { IDataItem, WaterFallDataItem } from '../interface'
import Card from '../Card'
import React from 'react'
import cls from 'classnames'
import './index.scss'

const PREFIX = 'WaterFallDataRow'

interface IProps {
  className?: string
  index: number
  height: number
  data: IDataItem
  gutter: number
  selectedItem?: WaterFallDataItem
  onClickItem: (item: WaterFallDataItem) => void
  render: (
    item: WaterFallDataItem,
    onClick: (item: WaterFallDataItem) => void
  ) => React.ReactNode
  style: React.CSSProperties
}

const WaterFallDataRow = function WaterFallDataRow(props: IProps) {
  const {
    style,
    index,
    height,
    data,
    gutter,
    selectedItem,
    render,
    onClickItem,
  } = props
  const { row, offsetLeft = 0, width = 0 } = selectedItem || {}

  return (
    <div className={`${PREFIX}-row`} style={style}>
      <div className={`${PREFIX}-rowBody`} style={{ height: `${height}px` }}>
        {data.map((value, index: number) => (
          <Card
            data={value}
            className={cls(`${PREFIX}-card`)}
            gutter={gutter}
            key={index}
          >
            {render(value, onClickItem)}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default React.memo(WaterFallDataRow)
