import { on } from './dom'

export const loadImage = (src: string) => {
  const promise = new Promise((resolve, reject) => {
    const img = new Image()
    on(img, 'load', () => {
      resolve(img)
    })
    on(img, 'error', () => {
      resolve(false)
    })
    img.src = src
  })
  return promise
}

export const loadImageByOrder = async (srcs: string[]) => {
  let img: HTMLImageElement
  const list = srcs.filter(Boolean)
  for (let i = 0; i < list.length; i++) {
    img = (await loadImage(list[i])) as HTMLImageElement
    if (img) return { src: list[i], img }
  }
  return Promise.reject(false)
}
