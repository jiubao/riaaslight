import { AppBar, Toolbar, Typography } from '@mui/material'
import cs from 'classnames'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { LogoIcon } from '../icons'
import './index.scss'

interface IProps {
  id?: string
}

const PREFIX = 'MainMenu'

export const MainMenu: React.FC<IProps> = ({ id }) => {
  const matchRog = useMatch('/rog')
  const matchPosm = useMatch('/posm')

  return (
    <div className={PREFIX}>
      <AppBar>
        <Toolbar>
          <LogoIcon />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <Link to="/rog" className={cs(PREFIX, { active: matchRog })}>
            ROG
          </Link>
          <Link to="/posm" className={cs(PREFIX, { active: matchPosm })}>
            POSM
          </Link>
          <Link to="/publications">Publications</Link>
          <Link to="/sku">SKU</Link>
          {/* <Button color="inherit" className={cs(PREFIX, { active: matchRog })}>
            ROG
          </Button>
          <Button color="inherit" className={cs(PREFIX, { active: matchPosm })}>
            POSM
          </Button> */}
          {/* <Button color="inherit">Publications</Button>
          <Button color="inherit">SKU</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}
