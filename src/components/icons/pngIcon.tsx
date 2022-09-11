import React from 'react'
import retailers from '../../assets/jsons/retailers.json'
import brands from '../../assets/jsons/brands.json'
import publishers from '../../assets/jsons/publishers.json'
import { PropsWithClassName } from '../../domain/common'
import { PngIconType } from '../../domain/icon'
import classNames from 'classnames'

interface IProps {
  name?: string | null
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

const publisherHash = new Map()
publishers.forEach((publisher) => {
  publisherHash.set(publisher.name, publisher.base64)
})

const IconHash = {
  [PngIconType.Brand]: brandHash,
  [PngIconType.Retailer]: retailerHash,
  [PngIconType.Publisher]: publisherHash,
}

const getIcon = (type: PngIconType, name?: string | null) => {
  return (
    IconHash[type].get(name ?? 'Default.png') ??
    IconHash[type].get('Default.png')
  )
}

export const PNGIcon: React.FC<PropsWithClassName<IProps>> = ({
  name = 'Default.png',
  type,
  className,
}) => {
  return (
    <img
      className={classNames(PREFIX, className)}
      alt=""
      src={getIcon(type, name)}
    />
  )
}
