import { IStoreDetail } from '../domain'

export const parseStoreAddress = (store?: IStoreDetail) => {
  if (!store) return ''
  return `${store.store_address}, ${store.store_city}, ${store.store_state_or_province}, ${store.store_country}`
}
