import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { BASE_AUTH_URI } from '../constants'
import { IUser } from '../domain'
import { IAuthToken, ILinkedinResponse } from '../domain/auth'
class AuthService {
  linkedinCallback(code: string) {
    return HttpService.get<ILinkedinResponse>(
      `${BASE_SERVICE_URI}/accounts/linkedin/callback?code=${code}`
    )
  }
  convertToken(token: string) {
    return HttpService.post<IAuthToken>(`${BASE_AUTH_URI}/convert-token`, {
      token,
      backend: 'linkedin-oauth2',
      grant_type: 'convert_token',
      client_id: 'KGkPjn6nenb6K2d8un4agJA49e3TYFtyuuVnBoq8',
      client_secret:
        'xJ69gLGKFS4D4l8rukGt1NhXO5zyCPbPKHqvXb6ps6OKEfeTSzhJwzXYQD7UTT3Dj1qNbKgDZfdnybWQBWjr0uhfn85rz9LkAwnBlskaqNyIyIm1CJU9JZw2BDbg0nDS',
    })
  }
  user() {
    return HttpService.get<IUser>(`${BASE_SERVICE_URI}/users/current`)
  }
}

export const authService = new AuthService()
