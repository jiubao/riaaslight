import { getRandomIntInclusive } from "../utils/random"

export const mockImgSrcByCount = (n = 50) =>
  Array(n)
    .fill(1)
    .map((_) => {
      const width = 600
      const height = getRandomIntInclusive(50, 600)
      return `https://fakeimg.pl/${width}x${height}`
    })

export const mockFixedSrcs = (n = 50, width = 400, height = 300) =>
  Array(n)
    .fill(1)
    .map(() => `https://fakeimg.pl/${width}x${height}`)
