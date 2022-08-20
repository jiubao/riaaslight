import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Debug } from '../debug'
import { DebugGallery } from '../debug/gallary'
import { GoogleMapDemo } from '../debug/map'
import { NotFound } from '../modules/notFound'
import { Posm } from '../modules/posm'
import { Rog } from '../modules/rog'
import { RetailerGallery } from '../modules/rog/gallery/retailer'
import { Retailer } from '../modules/rog/retailer'

export const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Rog />} />
        <Route path="rog" element={<Rog />} />
        <Route path="retailer/:id" element={<Retailer />} />
        <Route path="posm" element={<Posm />} />
      </Route>
      <Route
        path="retailer/:retailerId/gallery/:id"
        element={<RetailerGallery />}
      />
      <Route path="/debug" element={<Debug />}>
        <Route path="gallery" element={<DebugGallery />} />
        <Route path="map" element={<GoogleMapDemo />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
