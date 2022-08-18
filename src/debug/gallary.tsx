import React from 'react'
import { Gallery } from '../components/gallery'

const PREFIX = 'DebugGallery'

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

const TOTAL = 100

const srcs = Array(TOTAL)
  .fill(1)
  .map((_) => {
    const width = 300
    const height = getRandomIntInclusive(200, 800)
    return `https://fakeimg.pl/${width}x${height}`
  })

const Row = ({ index }: { index: number }) => {
  return <img src={`${srcs[index]}/?text=${index}`} alt="" />
}

export const DebugGallery: React.FC = () => {
  return (
    <div className={PREFIX}>
      <Gallery columnCount={7} total={TOTAL}>
        {Row}
      </Gallery>
    </div>
  )
}
