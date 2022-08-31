import React, { useMemo } from 'react'

export interface ITimelineItem {
    offset: number
    content: React.ReactNode
}

const PREFIX = 'TimelineItem'

export const TimelineItem: React.FC<ITimelineItem> = React.memo(({ offset = 0, content = null }) => {
    const style = useMemo(() => ({
        transform: `translateY(${offset}px)`
    }), [offset])

    return (
        <div className={PREFIX} style={style}>
            {content}
        </div>
    )
})
