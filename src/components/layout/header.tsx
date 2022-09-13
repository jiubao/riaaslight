import React from 'react'
import { LogoIcon, PosmIcon, PublicationIcon } from '../icons'
import { MenuButton } from './menu'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import AnchorIcon from '@mui/icons-material/Anchor'
import { useMatch } from 'react-router-dom'
import { User } from './user'

const PREFIX = 'Header'

export const MainHeader: React.FC = () => {
  const matchIndex = useMatch('/')
  const matchRogDetail = useMatch('/retailer/:id')
  const matchPosmDetail = useMatch('/posm/:id')
  const matchStore = useMatch('/store/:id')
  const matchPublication = useMatch('/publication')

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-logo`}>
        <LogoIcon width="98" height="29" viewBox="0 0 98 29" />
      </div>
      <MenuButton
        text="ROG"
        icon={<AddShoppingCartIcon />}
        to="/rog"
        match={!!(matchRogDetail || matchIndex || matchStore)}
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="POSM"
        icon={<PosmIcon />}
        to="/posm"
        match={!!matchPosmDetail}
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="Publications"
        icon={<PublicationIcon />}
        to="/publication"
        match={!!matchPublication}
        className={`${PREFIX}-menu`}
      />
      <MenuButton
        text="Price"
        icon={<LocalAtmIcon />}
        to="/price"
        className={`${PREFIX}-menu`}
      />
      <div className={`${PREFIX}-space`}></div>
      <User />
    </div>
  )
}
