import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Debug } from '../debug'
import { DebugGallery } from '../debug/gallary'
import { DemoImages } from '../debug/images'
import { DemoTimeline } from '../debug/line'
import { DemoTimeline2 } from '../debug/line2'
import { GoogleMapDemo } from '../debug/map'
import { DemoMask } from '../debug/mask'
import { DemoMasonry } from '../debug/masonry'
import { DemoToggleBox } from '../debug/togglebox'
import { NotFound } from '../modules/notFound'
import { Posm } from '../modules/posm'
import { Price } from '../modules/price'
import { Rog } from '../modules/rog'
import { StoreGallery } from '../modules/rog/gallery'
import { Store } from '../modules/store'

export const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Rog />} />
        <Route path="rog" element={<Rog />} />
        <Route path="store/:id" element={<Store />} />
        <Route path="posm" element={<Posm />} />
        <Route path="price" element={<Price />} />
      </Route>
      <Route path="store/:retailerId/gallery/:id" element={<StoreGallery />} />
      <Route path="/debug" element={<Debug />}>
        <Route path="toggle" element={<DemoToggleBox />} />
        <Route path="gallery" element={<DebugGallery />} />
        <Route path="map" element={<GoogleMapDemo />} />
        <Route path="mask" element={<DemoMask />} />
        <Route path="masonry" element={<DemoMasonry />} />
        <Route path="line" element={<DemoTimeline />} />
        <Route path="line2" element={<DemoTimeline2 />} />
        <Route path="images" element={<DemoImages />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
