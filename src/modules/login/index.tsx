import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLinkedIn } from 'react-linkedin-login-oauth2'
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import { LINKEDIN_CLIENTID } from '../../constants'
import { authService } from '../../services/auth'
import './index.scss'
import store from 'store'

const PREFIX = 'Login'

export const Login: React.FC = () => {
  const [code, setCode] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [token, setToken] = useState('')

  const { linkedInLogin } = useLinkedIn({
    clientId: LINKEDIN_CLIENTID,
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: async (code) => {
      console.log(code)
      setCode(code)
      setErrorMessage('')
      const linkedInRes = await authService.linkedinCallback(code)
      const authToken = await authService.convertToken(linkedInRes.access_token)
      setToken(authToken.access_token)
      store.set('access_token', authToken.access_token)
    },
    scope: 'r_emailaddress r_liteprofile',
    onError: (error) => {
      console.log(error)
      setCode('')
      setErrorMessage(error.errorMessage)
    },
  })

  return (
    <div className={PREFIX}>
      <Typography component="h1">
        <b>Welcome!</b>
      </Typography>
      <Typography>Sign in to continue</Typography>
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Log in with Linked In"
        style={{ maxWidth: '180px', cursor: 'pointer' }}
      />

      {!code && <div>No code</div>}
      {code && (
        <div>
          <div>Authorization Code: {code}</div>
          <div>
            Follow
            <a
              target="_blank"
              href="https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS#step-3-exchange-authorization-code-for-an-access-token"
              rel="noreferrer"
            >
              this
            </a>
            to continue
          </div>
        </div>
      )}
      {token && <div>token: {token}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}
