/**
 * handleRequestSuccess: (
 *   config: AxiosRequestConfig,
 * ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
 *
 * handleRequestError: (error: AxiosError) => AxiosError;
 *
 * handleResponseSuccess: (response: AxiosResponse) => AxiosResponse;
 *
 * handleResponseError: (error: AxiosError) => AxiosError;
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import { isArray, isObject, mapValues } from 'lodash'
// import { message } from 'antd';

export const uniqueKey = () => {
  let id = 0
  return () => String(id++)
}

export const mapDeep = (
  obj: any,
  iterator: (data: any) => string | boolean
): any => {
  const result = iterator(obj)
  if (result) return result
  if (isArray(obj)) {
    return obj.map((item) => mapDeep(item, iterator))
  }
  if (isObject(obj)) {
    return mapValues(obj, (v: any) => mapDeep(v, iterator))
  }
  return obj
}

export const bottomInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use((response: AxiosResponse) => {
    return response.data
  })
}
