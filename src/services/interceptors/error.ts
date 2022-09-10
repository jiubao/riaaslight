import { AxiosError, AxiosInstance } from 'axios'
import { history } from '../../App'

export const errorInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(undefined, (error: AxiosError) => {
    return commonErrorHandler(error)
  })

  instance.interceptors.response.use(undefined, (error: AxiosError) => {
    return commonErrorHandler(error)
  })
}

const commonErrorHandler = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status
    const data = error.response.data
    if (status === 401) {
      history.push('/login')
    } else if (status === 500) {
      console.error('code: ', data)
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('error.message: ', error.message)
  }
  console.error('error.config: ', error.config)
  return Promise.reject(error)
}
