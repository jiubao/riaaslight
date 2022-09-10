import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { BASE_AUTH_URI, BASE_SERVICE_URI } from '../../constants'
import { getAccessToken } from '../../storage'

const bearerToken = (token: string) => `bearer ${token}`

/**
 * for api(s) do not need authorization, put them here
 */
const auth_exceptions = [
  `${BASE_SERVICE_URI}/accounts/linkedin/callback`,
  `${BASE_AUTH_URI}/convert-token`,
  `${BASE_AUTH_URI}/token`,
]

const bypassAuth = (url: string) => {
  return auth_exceptions.some((item) => url.indexOf(item) >= 0)
}

export const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.url && config.headers && !bypassAuth(config.url)) {
      const token = getAccessToken()
      if (token) {
        config.headers.Authorization = bearerToken(token)
      }
    }
    return config
  })
}
