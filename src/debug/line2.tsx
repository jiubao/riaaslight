import { last } from 'lodash'
import React, { useRef } from 'react'
import { PNGIcon } from '../components/icons/pngIcon'
import { ITimelineItem, Timeline } from '../components/timeline'
import { useTimelineScrollItems } from '../components/timeline/hooks'
import { PngIconType } from '../domain/icon'
import { getRandomIntInclusive } from '../utils/random'
import './index.scss'

const PREFIX = 'DemoTimeline'

// const items = Array(10).fill(1).map((_, index) => ({offset: getRandomIntInclusive(300, 1000), content: index}))
const items = Array(2)
  .fill(1)
  .reduce<ITimelineItem[]>(
    (result, _, index) => {
      const height = getRandomIntInclusive(50, 800)
      const latest = last(result)
      result.push({
        offset: height + (latest ? latest?.offset : 0),
        content: height,
      })
      return result
    },
    [{ offset: 0, content: 0 }]
  )

const totalHeight = (last(items)?.offset ?? 0) + 300

export const DemoTimeline2: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const scrollItems = useTimelineScrollItems(items, divRef)

  return (
    <div className={PREFIX} ref={divRef}>
      <PNGIcon name="DELHAIZE LE LION (AHOLD)" type={PngIconType.Retailer} />
      <div style={{ height: totalHeight, position: 'relative' }}>
        <Timeline items={scrollItems} />
      </div>
    </div>
  )
}
