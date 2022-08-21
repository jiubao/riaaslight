import React from 'react'
import { ImageMaskWindow } from '../components/imageMaskWindow'
import { RectType } from '../domain/shape'
import './index.scss'

const PREFIX = 'DemoMask'

const src =
  'https://th.bing.com/th/id/R.7718c6d8a04568a1a954981df9eba2c5?rik=yXegk14b%2fRupog&riu=http%3a%2f%2fpic116.huitu.com%2fres%2f20190401%2f1064195_20190401115725030070_1.jpg&ehk=2%2fk0O4qZcyb1ihdmwqVl8fnFRc0Jowe3pejuSzrZTU8%3d&risl=&pid=ImgRaw&r=0'

const rects = [
  [0, 0, 0.1, 0.15],
  [0.7, 0.2, 0.1, 0.15],
  [0.5, 0.5, 0.1, 0.15],
  [0.8, 0.8, 0.1, 0.15],
] as RectType[]

export const DemoMask: React.FC = () => {
  return (
    <div className={PREFIX}>
      mask
      <ImageMaskWindow
        src={src}
        rectangles={rects}
        className={`${PREFIX}-Window`}
      />
    </div>
  )
}
