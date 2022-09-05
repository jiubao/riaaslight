import { IStoreDetail } from '../domain'

export const parseStoreAddress = (store?: IStoreDetail) => {
  if (!store) return ''
  return `${store.store_address}, ${store.store_city}, ${store.store_state_or_province}, ${store.store_country}`
}

export const removeEmptyProps = <T extends Record<string, any>>(
  obj: T
): any => {
  return Object.keys(obj).reduce<any>((result, key) => {
    if (obj[key] !== undefined && obj[key] !== '') {
      result[key] = obj[key]
    }
    return result
  }, {})
}

export const date2Month = (date: string) => date.slice(0, 7)
