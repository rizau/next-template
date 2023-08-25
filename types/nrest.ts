export interface RestResponse {
  isOk: boolean
  message: string
  data: any
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  username: string
  branchcode: string
  dbname: string
  jlogin: string

  error: string
}

export type LoginDto = {
  username: string
  password: string
  dbname: string
  branch: string
}
