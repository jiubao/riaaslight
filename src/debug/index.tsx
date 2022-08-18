import React from 'react'
import { Outlet } from 'react-router-dom'

const PREFIX = 'Debug'

export const Debug: React.FC = () => {
  return (
    <div className={PREFIX}>
      <Outlet />
    </div>
  )
}
