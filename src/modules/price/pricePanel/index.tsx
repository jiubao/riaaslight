import React from 'react'
import cls from 'classnames'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import './index.scss'

const PREFIX = 'PricePanel'

interface IProps {
  className?: string
}

const PricePanel: React.FC<IProps> = React.memo(function PricePanel(props) {
  const { className } = props
  return (
    <div className={cls(`${PREFIX}`, className)}>
      <div className={`${PREFIX}-content`}>
        <IconButton className={`${PREFIX}-content-close`}>
          <CloseIcon />
        </IconButton>
        <div className={`${PREFIX}-price`}>
          <div>
            
          </div>
        </div>
        <div className={`${PREFIX}-trend`}></div>
      </div>
    </div>
  )
})

export default PricePanel
