import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout'
import { GoogleMapDemo } from '../debug/map'
import { NotFound } from '../modules/notFound'
import { Posm } from '../modules/posm'
import { Rog } from '../modules/rog'

export const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/rog" element={<Rog />} />
        <Route path="/posm" element={<Posm />} />
      </Route>
      <Route path="/debug" element={<GoogleMapDemo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
