import { Avatar, Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUser, selectUser } from '../../../store/userSlice'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import store from 'store'
import './index.scss'

const PREFIX = 'User'

export const User: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    store.remove('access_token')
    store.remove('refresh_token')
    handleClose()
    navigate('/login')
  }

  useEffect(() => {
    dispatch(fetchUser() as any)
  }, [dispatch])

  return (
    <>
      <div className={`${PREFIX} flexMiddle`} onClick={handleClick}>
        {user?.avatar.small && <Avatar alt="" src={user?.avatar.small} />}
        <div className={`${PREFIX}-info`}>{user?.first_name}</div>
        <ExpandMoreIcon fontSize="small" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
