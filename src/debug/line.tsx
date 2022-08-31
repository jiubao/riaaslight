import { last } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { ITimelineItem, Timeline } from '../components/timeline'
import { getRandomIntInclusive } from '../utils/random'
import './index.scss'

const PREFIX = 'DemoTimeline'

// const items = Array(10).fill(1).map((_, index) => ({offset: getRandomIntInclusive(300, 1000), content: index}))
const items = Array(10).fill(1).reduce<ITimelineItem[]>((result, _, index) => {
    const height = getRandomIntInclusive(50, 800)
    const latest = last(result)
    result.push({ offset: height + (latest ? latest?.offset : 0), content: height })
    return result
}, [{ offset: 0, content: 0 }])

const totalHeight = (last(items)?.offset ?? 0) + 300

export const DemoTimeline: React.FC = () => {
    const [scrollItems, setItems] = useState(items)

    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const dom = divRef.current
        if (!dom) return
        const handleScroll = () => {
            const top = dom.scrollTop
            const next: ITimelineItem[] = []
            for (let i = items.length - 2; i >= 0; i--) {
                const { offset, content } = items[i]
                if (offset <= top && items[i + 1].offset > top) {
                    next.push({ offset: top, content })
                } else {
                    next.push(items[i])
                }
            }
            setItems(next)
        }
        dom.addEventListener('scroll', handleScroll)
        return () => {
            dom.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className={PREFIX} ref={divRef}>
            <div style={{height: totalHeight}}>
                <Timeline items={scrollItems} />
            </div>
        </div>
    )
}
