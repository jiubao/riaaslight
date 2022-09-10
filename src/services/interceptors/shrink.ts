import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { isNil } from 'lodash'

export const shrinkInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const params = config?.params
    if (params) {
      config.params = Object.keys(params).reduce<any>((result, key) => {
        const item = params[key]
        if (!isNil(item) && item !== '') {
          result[key] = item
        }
        return result
      }, {})
    }
    return config
  })
}
