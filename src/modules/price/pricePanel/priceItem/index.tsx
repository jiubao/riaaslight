import cls from 'classnames'
import React from 'react'
import { PNGIcon } from '../../../../components/icons/pngIcon'
import { PngIconType } from '../../../../domain/icon'
import { IPriceItem } from '../interface'
import './index.scss'

const PREFIX = 'PriceItem'

interface IProps {
  className?: string
  data: IPriceItem
}

const PriceItem: React.FC<IProps> = React.memo(function PriceItem(props) {
  const { className, data } = props
  const { retailer_name, min_price, max_price, retailerId } = data
  console.log('render priceItem')
  return (
    <div className={cls(`${PREFIX}`, className)}>
      <div className={cls(`${PREFIX}-content`)}>
        <PNGIcon name={retailer_name} type={PngIconType.Retailer} />
        <span className={`${PREFIX}-title`}>{retailer_name}</span>
        <div className={`${PREFIX}-price low`}>
          <span className="prefix">L</span>
          <span className="price">${min_price}</span>
        </div>
        <div className={`${PREFIX}-price high`}>
          <span className="prefix">H</span>
          <span className="price">${max_price}</span>
        </div>
      </div>
    </div>
  )
})

export default PriceItem
