let supportPassive = false

const noop = () => {
  //
}
const options = Object.defineProperty({}, 'passive', {
  // eslint-disable-next-line getter-return
  get() {
    supportPassive = true
  },
})

window.addEventListener('testPassive', noop, options)
window.removeEventListener('testPassive', noop, options)

const defaultEventOptions = () =>
  supportPassive ? { capture: false, passive: true } : false

export const on = (
  element:
    | HTMLElement
    | Document
    | Window
    | FileReader
    | MediaSource
    | SourceBuffer,
  event: string,
  handler: EventListenerOrEventListenerObject,
  opts?: any
) => {
  const options = opts === undefined ? defaultEventOptions() : opts
  element.addEventListener(event, handler, options)
  return () => off(element, event, handler, options)
}

export const off = (
  element:
    | HTMLElement
    | Document
    | Window
    | FileReader
    | MediaSource
    | SourceBuffer,
  event: string,
  handler: EventListenerOrEventListenerObject,
  opts?: any
) => {
  element.removeEventListener(event, handler, opts || defaultEventOptions())
}

export const once = (
  element: HTMLElement | Document | Window | FileReader,
  event: string,
  // handler: EventListenerOrEventListenerObject,
  handler: EventListener,
  opts?: any
) => {
  const options = opts === undefined ? defaultEventOptions() : opts
  let dispose: () => void
  const fn = (e: Event) => {
    dispose && dispose()
    handler(e)
  }
  element.addEventListener(event, fn, options)
  dispose = () => off(element, event, fn, options)
  return dispose
}

export const applyTranslate = (elm: HTMLElement, x: number, y: number) =>
  (elm.style.transform = `translate3d(${x}px,${y}px,0)`)

export function getRelativePosition(e: MouseEvent, elm: HTMLElement) {
  const { left, top } = elm.getBoundingClientRect()
  const posX = left + window.pageXOffset
  const posY = top + window.pageYOffset
  const x = Math.round(e.pageX - posX)
  const y = Math.round(e.pageY - posY)
  return { x, y }
}

export const UNDEFINED = void 0
export const emptyFn = () => UNDEFINED

export const hasClass = (elm: HTMLElement, className: string) =>
  elm.className &&
  new RegExp('(^|\\s)' + className + '(\\s|$)').test(elm.className)

export const addClass = (elm: HTMLElement, className: string) => {
  if (!hasClass(elm, className)) {
    elm.className += (elm.className ? ' ' : '') + className
  }
}
export const removeClass = (elm: HTMLElement, className: string) => {
  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
  elm.className = elm.className
    .replace(reg, ' ')
    .replace(/^\s\s*/, '')
    .replace(/\s\s*$/, '')
}
