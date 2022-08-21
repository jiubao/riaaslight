import { RectType } from '../domain/shape'

export class CanvasHelper {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor(dom: HTMLCanvasElement) {
    this.canvas = dom
    this.ctx = dom.getContext('2d') as CanvasRenderingContext2D
  }

  drawRect([x, y, w, h]: RectType) {
    // this.ctx.rect(x, y, w, h)
    // this.ctx.fill()
    this.ctx.lineWidth = 10
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.strokeRect(x, y, w, h)
  }

  drawImage(img: HTMLImageElement, [x, y, w, h]: RectType) {
    this.ctx.drawImage(img, x, y, w, h, 0, 0, w, h)
  }

  // draw(
  //   img: HTMLImageElement,
  //   [x, y, w, h]: RectType,
  //   { size, color }: IStroke
  // ) {
  //   this.ctx.drawImage(img, x, y, w, h, size, size, w, h)
  //   this.ctx.lineWidth = size * 2
  //   this.ctx.strokeStyle = color
  //   this.ctx.strokeRect(0, 0, w + size * 2, h + size * 2)
  // }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    return this
  }
}
