import classNames from 'classnames'
import React, { useMemo } from 'react'

export interface ITimelineItem {
  offset: number
  content: React.ReactNode
  fixed?: boolean
}

const PREFIX = 'TimelineItem'

export const TimelineItem: React.FC<ITimelineItem> = React.memo(
  ({ offset = 0, content = null, fixed = false }) => {
    const style = useMemo(
      () => ({
        transform: fixed ? 'none' : `translateY(${offset}px)`,
      }),
      [fixed, offset]
    )

    return (
      <div
        className={classNames(PREFIX, { [`${PREFIX}-fixed`]: fixed })}
        style={style}
      >
        <div className={`${PREFIX}-content flexCore`}>{content}</div>
      </div>
    )
  }
)
