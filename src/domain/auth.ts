export interface ILinkedinResponse {
  access_token: string
  expires_in: number
}

export interface IAuthToken {
  access_token: string
  expires_in: number
  token_type: string // "Bearer"
  scope: string // "read write",
  refresh_token: string
}
