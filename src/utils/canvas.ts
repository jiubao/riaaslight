import { RectType } from '../domain/shape'

export class CanvasHelper {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor(dom: HTMLCanvasElement) {
    this.canvas = dom
    this.ctx = dom.getContext('2d') as CanvasRenderingContext2D
  }

  drawRect([x, y, w, h]: RectType, color: string) {
    // this.ctx.rect(x, y, w, h)
    // this.ctx.fill()
    // this.ctx.lineWidth = 10
    // this.ctx.strokeStyle = '#ffffff'
    this.ctx.fillStyle = color
    // this.ctx.strokeRect(x, y, w, h)
    this.ctx.fillRect(x, y, w, h)
    console.log('.')
  }

  stroke([x, y, w, h]: RectType, color: string, size: number) {
    const half = size / 2
    const length = size * 4

    const path1 = new Path2D()
    path1.moveTo(half, length)
    path1.lineTo(half, half)
    path1.lineTo(length, half)

    const path2 = new Path2D()
    path2.moveTo(w + size * 2 - length, half)
    path2.lineTo(w + size * 2 - half, half)
    path2.lineTo(w + size * 2 - half, size * 4)

    const path3 = new Path2D()
    path3.moveTo(w + size * 2 - half, h + size * 2 - size * 4)
    path3.lineTo(w + size * 2 - half, h + size * 2 - half)
    path3.lineTo(w + size * 2 - size * 4, h + size * 2 - half)

    const path4 = new Path2D()
    path4.moveTo(size * 4, h + size * 2 - half)
    path4.lineTo(half, h + size * 2 - half)
    path4.lineTo(half, h + size * 2 - size * 4)

    this.ctx.beginPath()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = size
    this.ctx.stroke(path1)
    this.ctx.stroke(path2)
    this.ctx.stroke(path3)
    this.ctx.stroke(path4)
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
