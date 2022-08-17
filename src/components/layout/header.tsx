import React from 'react'
import { LogoIcon } from '../icons'
import { MenuButton } from './menu'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import AnchorIcon from '@mui/icons-material/Anchor'

const PREFIX = 'Header'

export const MainHeader: React.FC = () => {
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-logo`}>
        <LogoIcon />
      </div>
      <MenuButton
        text="ROG"
        icon={<AddShoppingCartIcon />}
        to="/rog"
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="POSM"
        icon={<AccessAlarmIcon />}
        to="/posm"
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
