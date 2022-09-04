import React from 'react'
import { CropImage } from '../components/image/cropImage'

const PREFIX = 'DemoImages'
const src =
  'https://f-riaas-api.clobotics.com/v/0d32e265216c2cdb2568c801172cf7ad.jpg'

export const DemoImages: React.FC = () => {
  return (
    <div className={PREFIX}>
      <img src={src} alt="" />
      <br />
      <CropImage
        src={src}
        position={[0.326689222, 0.360675513, 0.621117222, 0.399879373]}
      />
    </div>
  )
}
