import React, { useState } from 'react'
import { useLinkedIn } from 'react-linkedin-login-oauth2'
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import { authService } from '../../services/auth'
import './index.scss'
import store from 'store'
import { useNavigate } from 'react-router-dom'
import { LR } from '../../components/layout/lr'
import { LogoIcon } from '../../components/icons'
import { CommonModal } from '../../components/modal'
import { CircularProgress } from '@mui/material'
import bg from '../../assets/login.jpg'
import { LINKEDIN_CLIENTID } from '../../config'

const PREFIX = 'Login'

const Left = () => {
  return (
    <div className={`${PREFIX}-left fulfilled`}>
      <img
        // src="https://s.cn.bing.net/th?id=OHR.MidAutumn2022_ZH-CN9825550508_1920x1080.jpg&rf=LaDigue_1920x1080.jpg"
        src={bg}
        alt=""
      />
      {/* <div className={`${PREFIX}-mask fulfilled`}></div> */}
      <span className="center">ROG PICTURES UPDATE DAILY</span>
    </div>
  )
}

const redirectUri = `${window.location.origin}/linkedin`

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { linkedInLogin } = useLinkedIn({
    clientId: LINKEDIN_CLIENTID,
    redirectUri,
    onSuccess: async (code) => {
      // console.log(code)
      setLoading(true)
      try {
        const linkedInRes = await authService.linkedinCallback(
          code,
          redirectUri
        )
        const authToken = await authService.convertToken(
          linkedInRes.access_token
        )
        store.set('access_token', authToken.access_token)
        navigate('/')
      } finally {
        setLoading(false)
      }
    },
    scope: 'r_emailaddress r_liteprofile',
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <LR className={PREFIX} left={<Left />} percent={68}>
      <div className={`${PREFIX}-right fulfilled flexCore`}>
        <div className={`${PREFIX}-logo`}>
          <LogoIcon width="98" height="29" viewBox="0 0 98 29" />
        </div>
        <img
          onClick={linkedInLogin}
          src={linkedin}
          alt="Log in with Linked In"
          style={{ maxWidth: '180px', cursor: 'pointer' }}
        />
      </div>

      {loading && (
        <CommonModal>
          <div className={`${PREFIX}-loading fulfilled flexCore`}>
            <CircularProgress />
          </div>
        </CommonModal>
      )}
    </LR>
  )
}
