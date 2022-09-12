import { HttpService } from '.'
import { CLIENT_ID, CLIENT_SECRET } from '../config'
import { BASE_SERVICE_URI } from '../constants'
import { BASE_AUTH_URI } from '../constants'
import { IUser } from '../domain'
import { IAuthToken, ILinkedinResponse } from '../domain/auth'
class AuthService {
  linkedinCallback(code: string, redirectUri: string) {
    return HttpService.get<ILinkedinResponse>(
      `${BASE_SERVICE_URI}/accounts/linkedin/callback?code=${code}&redirect_uri=${redirectUri}`
    )
  }
  convertToken(token: string) {
    return HttpService.post<IAuthToken>(`${BASE_AUTH_URI}/convert-token`, {
      token,
      backend: 'linkedin-oauth2',
      grant_type: 'convert_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    })
  }
  user() {
    return HttpService.get<IUser>(`${BASE_SERVICE_URI}/users/current`)
  }
}

export const authService = new AuthService()
