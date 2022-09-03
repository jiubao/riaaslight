import { useEffect, useState } from 'react'
import { ITimelineItem } from './item'

export const useTimelineScrollItems = (
  items: ITimelineItem[],
  scrollRef: React.RefObject<HTMLDivElement>
) => {
  const [scrollItems, setItems] = useState(items)

  useEffect(() => {
    setItems(items)
    const dom = scrollRef.current
    if (!dom) return
    const handleScroll = () => {
      const scrollTop = dom.scrollTop
      // const next: ITimelineItem[] = []
      for (let i = items.length - 1; i >= 0; i--) {
        const { offset, content } = items[i]
        if (offset < scrollTop) {
          const next = [...items]
          next.splice(i, 1, { offset: scrollTop, content, fixed: true })
          setItems(next)
          return
        }
        // if (offset > scrollTop && items[i - 1].offset < scrollTop) {
        //   const next = [...items]
        //   next.splice(i - 1, 1, { offset: scrollTop, content, fixed: true })
        //   setItems(next)
        //   return
        // }
      }
      // for (let i = items.length - 2; i >= 0; i--) {
      //   const { offset, content } = items[i]
      //   if (offset <= top && items[i + 1].offset > top) {
      //     next.push({ offset: top, content, fixed: true })
      //   } else {
      //     next.push(items[i])
      //   }
      // }
      // setItems(next)
    }
    dom.addEventListener('scroll', handleScroll)
    return () => {
      dom.removeEventListener('scroll', handleScroll)
    }
  }, [items, scrollRef])

  return scrollItems
}
