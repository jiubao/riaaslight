import React, { useState } from 'react'
import { useLinkedIn } from 'react-linkedin-login-oauth2'
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import { LINKEDIN_CLIENTID } from '../../constants'
import { authService } from '../../services/auth'
import './index.scss'
import store from 'store'
import { useNavigate } from 'react-router-dom'
import { LR } from '../../components/layout/lr'
import { LogoIcon } from '../../components/icons'

const PREFIX = 'Login'

const Left = () => {
  return (
    <div className={`${PREFIX}-left fulfilled`}>
      <img
        src="https://s.cn.bing.net/th?id=OHR.MidAutumn2022_ZH-CN9825550508_1920x1080.jpg&rf=LaDigue_1920x1080.jpg"
        alt=""
      />
      <div className={`${PREFIX}-mask fulfilled`}></div>
      <span className="center">ROG PICTURES UPDATE DAILY</span>
    </div>
  )
}

export const Login: React.FC = () => {
  const navigate = useNavigate()

  const { linkedInLogin } = useLinkedIn({
    clientId: LINKEDIN_CLIENTID,
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: async (code) => {
      console.log(code)
      const linkedInRes = await authService.linkedinCallback(code)
      const authToken = await authService.convertToken(linkedInRes.access_token)
      store.set('access_token', authToken.access_token)
      navigate('/')
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
    </LR>
  )
}
