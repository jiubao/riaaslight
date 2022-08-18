import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Debug } from '.'
import { DebugGallery } from './gallary'
import { GoogleMapDemo } from './map'

export const DebugRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/debug" element={<Debug />}>
        <Route path="gallery" element={<DebugGallery />} />
        <Route path="map" element={<GoogleMapDemo />} />
      </Route>
    </Routes>
  )
}
