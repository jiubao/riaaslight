import store from 'store'

export const getAccessToken = () => {
  return store.get('access_token')
}

export const getRefreshToken = () => {
  return store.get('refresh_token')
}
