import { bottomInterceptor } from './interceptors'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { authInterceptor } from './interceptors/auth'
import { errorInterceptor } from './interceptors/error'
import { shrinkInterceptor } from './interceptors/shrink'

type PaginationConfig = { pagination: boolean }
type MultipartConfig = { multipart: boolean }
type PureMultipartConfig = { file: boolean }
type FeedbackConfig = { errorToast: boolean; successToastMessage: string }

export type RequestConfig = AxiosRequestConfig &
  FeedbackConfig &
  PaginationConfig &
  MultipartConfig &
  PureMultipartConfig & {
    removeEmptyFields: boolean
  }

export type PartialRequestConfig = Partial<RequestConfig>
type Request<T> = T & PartialRequestConfig

/**
 * 接口强制不缓存
 * Caution:
 * in cors requests, [Cache-Control] header results in the OPTIONS request, so remove it for cors.
 */
axios.defaults.headers.common.Pragma = 'no-cache'
axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'

const defaultConfig: AxiosRequestConfig = {
  timeout: 30000,
  // validateStatus: status => status === 200,
}

export interface IPaginationRequest {
  start: number
  limit: number
  lastTotalCount?: number
}

export interface IPagination {
  total: number
  limit: number
  start: number
}

export interface IOneapiParam {
  exhausted: boolean
  cursor: number
  estimatedsize: number
}
export interface IPaginationResponse<T> {
  data: T
  pagination: IPagination
}

class Http {
  private axiosInstance: AxiosInstance

  constructor() {
    const instance = (this.axiosInstance = axios.create(defaultConfig))
    authInterceptor(instance)
    shrinkInterceptor(instance)
    bottomInterceptor(instance)
    errorInterceptor(instance)
  }

  get<T>(
    url: string,
    data: any,
    config: Request<PaginationConfig>
  ): Promise<IPaginationResponse<T>>
  get<T>(url: string, data?: any, config?: PartialRequestConfig): Promise<T>
  get(url: any, data?: any, config: any = {}): any {
    return this.axiosInstance.request({
      url,
      method: 'get',
      params: data,
      ...config,
    })
  }

  post<T>(
    url: string,
    data: any,
    config: Request<PaginationConfig>
  ): Promise<IPaginationResponse<T>>

  post<T>(url: string, data?: any, config?: PartialRequestConfig): Promise<T>
  post(url: string, data?: any, config: any = {}): any {
    return this.axiosInstance.request({ url, method: 'post', data, ...config })
  }

  put<T>(
    url: string,
    data?: any,
    config: PartialRequestConfig = {}
  ): Promise<T> {
    return this.axiosInstance.request({ url, method: 'put', data, ...config })
  }

  delete<T>(
    url: string,
    data?: any,
    config: PartialRequestConfig = {}
  ): Promise<T> {
    return this.axiosInstance.request({
      url,
      method: 'delete',
      params: data,
      ...config,
    })
  }

  patch<T>(
    url: string,
    data?: any,
    config: PartialRequestConfig = {}
  ): Promise<T> {
    return this.axiosInstance.request({ url, method: 'patch', data, ...config })
  }
}

export const HttpService = new Http()
