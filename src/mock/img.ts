function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

export const mockImgSrcByCount = (n = 50) =>
  Array(n)
    .fill(1)
    .map((_) => {
      const width = 300
      const height = getRandomIntInclusive(200, 600)
      return `https://fakeimg.pl/${width}x${height}`
    })
