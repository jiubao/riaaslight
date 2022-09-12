import React from 'react'
import { ZoomWindow } from '../components/zoom/window'
import './index.scss'

const PREFIX = 'DemoZoom'

const src =
  'https://s.cn.bing.net/th?id=OHR.MidAutumn2022_ZH-CN9825550508_1920x1080.jpg&rf=LaDigue_1920x1080.jpg'

export const DemoZoom: React.FC = () => {
  return (
    <div className={`${PREFIX} center flexCenter`}>
      <div className={`${PREFIX}-wrap`}>
        <img className={`${PREFIX}-img`} src={src} alt="" />
        <ZoomWindow src={src} />
      </div>
    </div>
  )
}
