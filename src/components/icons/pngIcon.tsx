import React from 'react'
import retailers from '../../assets/jsons/retailers.json'
import brands from '../../assets/jsons/brands.json'
import { PropsWithClassName } from '../../domain/common'
import { PngIconType } from '../../domain/icon'
import classNames from 'classnames'

interface IProps {
  name: string
  type: PngIconType
}

const PREFIX = 'PNGIcon'

const retailerHash = new Map()
retailers.forEach((retailer) => {
  retailerHash.set(retailer.name, retailer.base64)
})

const brandHash = new Map()
brands.forEach((brand) => {
  brandHash.set(brand.name, brand.base64)
})

const IconHash = {
  [PngIconType.Brand]: brandHash,
  [PngIconType.Retailer]: retailerHash,
}

// const getSrc = (name: string, type: PngIconType) => {
//   switch (type) {
//     case PngIconType.Retailer:
//       return retailerHash
//     case PngIconType.Brand:
//     default:
//       return brandHash
//   }
// }

export const PNGIcon: React.FC<PropsWithClassName<IProps>> = ({
  name,
  type,
  className,
}) => {
  return (
    <img
      className={classNames(PREFIX, className)}
      alt=""
      src={IconHash[type].get(name)}
    />
  )
}
