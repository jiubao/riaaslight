import React from 'react'
// import { ImageMaskWindow } from '../components/imageMaskWindow'
import './index.scss'

const PREFIX = 'DemoZoom'

// const src =
//   'https://th.bing.com/th/id/R.7718c6d8a04568a1a954981df9eba2c5?rik=yXegk14b%2fRupog&riu=http%3a%2f%2fpic116.huitu.com%2fres%2f20190401%2f1064195_20190401115725030070_1.jpg&ehk=2%2fk0O4qZcyb1ihdmwqVl8fnFRc0Jowe3pejuSzrZTU8%3d&risl=&pid=ImgRaw&r=0'

const src =
  'https://s.cn.bing.net/th?id=OHR.MidAutumn2022_ZH-CN9825550508_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'

export const DemoZoom: React.FC = () => {
  return (
    <div className={`${PREFIX} center`}>
      <img src={src} alt="" />
    </div>
  )
}
