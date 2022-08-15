import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Posm } from '../modules/posm'
import { Rog } from '../modules/rog'

export const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Rog />} />
      <Route path="/rog" element={<Rog />} />
      <Route path="/posm" element={<Posm />} />
    </Routes>
  )
}
