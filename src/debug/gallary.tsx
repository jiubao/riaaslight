import React from 'react'
import { Gallery } from '../components/gallery'
import { mockImgSrcByCount } from '../mock/img'

const PREFIX = 'DebugGallery'

// function getRandomIntInclusive(min: number, max: number) {
//   min = Math.ceil(min)
//   max = Math.floor(max)
//   return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
// }

// const srcs = Array(TOTAL)
//   .fill(1)
//   .map((_) => {
//     const width = 300
//     const height = getRandomIntInclusive(200, 800)
//     return `https://fakeimg.pl/${width}x${height}`
//   })

const TOTAL = 50
const srcs = mockImgSrcByCount(TOTAL)

const Row = ({ index }: { index: number }) => {
  return <img src={`${srcs[index]}/?text=${index}`} alt="" />
}

export const DebugGallery: React.FC = () => {
  return (
    <div className={PREFIX}>
      <Gallery columnCount={4} total={TOTAL}>
        {Row}
      </Gallery>
    </div>
  )
}
