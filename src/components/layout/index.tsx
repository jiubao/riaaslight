import React from 'react'
import { Outlet } from 'react-router-dom'
import { MainHeader } from './header'
import './index.scss'

const PREFIX = 'Layout'

export const Layout: React.FC = () => {
  return (
    <div className={PREFIX}>
      <MainHeader />
      <Outlet />
    </div>
  )
}
