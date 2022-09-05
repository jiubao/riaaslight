import { useEffect, useState } from 'react'
import { ITimelineItem } from './item'

export const useTimelineScrollItems = (
  items: ITimelineItem[],
  scrollRef: React.RefObject<HTMLDivElement>
) => {
  const [scrollItems, setScrollItems] = useState(items)

  useEffect(() => {
    setScrollItems(items)
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
          setScrollItems(next)
          return
        }
      }
    }
    handleScroll()
    dom.addEventListener('scroll', handleScroll)
    return () => {
      dom.removeEventListener('scroll', handleScroll)
    }
  }, [items, scrollRef])

  return scrollItems
}
