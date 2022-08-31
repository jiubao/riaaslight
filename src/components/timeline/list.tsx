import React from 'react'
import { ITimelineItem, TimelineItem } from './item'
import './index.scss'

interface IProps {
    items?: ITimelineItem[]
}

const PREFIX = 'Timeline'

export const Timeline: React.FC<IProps> = ({ items = [] }) => {
    return (
        <div className={PREFIX}>
            {items.map((item, index) => (<TimelineItem key={index} {...item} />))}
        </div>
    )
}
