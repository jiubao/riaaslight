import React from 'react'
import cls from 'classnames'
import './index.scss'
import { IPriceWithRetailer } from '../../../../store/priceSlice'

const PREFIX = 'PriceItem'

interface IProps {
  className?: string
  data: IPriceWithRetailer
}

const PriceItem: React.FC<IProps> = React.memo(function PriceItem(props) {
  const { className, data } = props
  const { currency, min_price, max_price, avg_price, price_count, retailerId } =
    data
  return (
    <div className={cls(`${PREFIX}`, className)}>
      <div className={cls(`${PREFIX}-content`)}>
        <img className={`${PREFIX}-img`} src={''} alt="" />
        <span className={`${PREFIX}-title`}>{retailerId}</span>
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
