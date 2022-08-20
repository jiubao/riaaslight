import React from 'react'
import { LogoIcon } from '../icons'
import { MenuButton } from './menu'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import AnchorIcon from '@mui/icons-material/Anchor'
import { useMatch } from 'react-router-dom'

const PREFIX = 'Header'

export const MainHeader: React.FC = () => {
  const matchIndex = useMatch('/')
  const matchRogDetail = useMatch('/retailer/:id')
  const matchPosmDetail = useMatch('/posm/:id')

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-logo`}>
        {/* <LogoIcon /> */}
        <LogoIcon width="135" height="27" viewBox="0 0 135 27" />
      </div>
      <MenuButton
        text="ROG"
        icon={<AddShoppingCartIcon />}
        to="/rog"
        match={!!(matchRogDetail || matchIndex)}
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="POSM"
        icon={<AccessAlarmIcon />}
        to="/posm"
        match={!!matchPosmDetail}
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="Publications"
        icon={<AnchorIcon />}
        to="/publications"
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="Price"
        icon={<LocalAtmIcon />}
        to="/price"
        className={`${PREFIX}-menu`}
      />
    </div>
  )
}
