import { LoginDto, RestResponse, TokenResponse } from "@/types/nrest"

export default class NRestService {
  private token: string | null = null
  private adminUser: LoginDto = {
    username: "netsis",
    password: "net1",
    dbname: "rzu23",
    branch: "0",
  }
  private restAddress = process.env.NETSIS_REST_ADDRESS
  private setToken(token: string) {
    this.token = token
  }

  public constructor(token?: string) {
    //console.log("ctor", this.token)
    this.initial()
  }
  private async initial(token?: string) {
    if (token) {
      console.log("token verildi")
      this.token = token
    } else {
      console.log("token verilmedi")
      const user: LoginDto = this.adminUser
      const token = await this.getToken(user)
      this.setToken(token?.access_token ?? "")
    }
  }

  public async getToken(payload: LoginDto): Promise<TokenResponse | null> {
    try {
      const { username, password, branch, dbname } = payload

      const url = `${this.restAddress}token`
      const dbuser = process.env.NREST_DBUSER || "sa"
      const dbpassword = process.env.NREST_DBPASSWORD || "sapass"

      const grant = `grant_type=password&branchcode=${branch}&password=${password}&username=${username}&dbname=${dbname}&dbuser=${dbuser}&dbpassword=${dbpassword}&dbtype=0`
      const response = await fetch(url, {
        method: "post",
        body: grant,
        headers: {
          //Authorization: 'Bearer ' + auth,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      })
      const data: TokenResponse = await response.json()
      if (!data.error) {
        return data
      }
      this.setToken(data.access_token)
      console.log("gettoken", data)
      return data
    } catch (error) {
      //this.refreshToken();
      return null
    }
  }

  private async makeRequest(
    url: string,
    method: string = "get",
    payload?: any
  ): Promise<RestResponse> {
    //console.log("mr", this.token)
    let tokenData: {
      access_token: string
    } = { access_token: "" }
    console.log("m r", this.token)

    tokenData = (await this.getToken(this.adminUser)) as {
      access_token: string
    }
    console.log("tokenData", tokenData)
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        // Authorization: `${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }

    if (method === "post") {
      options["body"] = JSON.stringify(payload)
    }

    try {
      console.log("options", options)

      const response = await fetch(`${this.restAddress}${url}`, options)

      if (!response.ok) {
        //throw new Error(`Request failed with status code ${response.status}`)
        if (response.status == 401) {
          //await this.refreshToken();
          const message = response.statusText
          /*   ? "Netsis oturumunuz sonlamış, tekrar giriş yapınız..."
            : "Token bulunamadı"*/
          return { isOk: false, message, data: null }
        }
        return { isOk: false, message: response.statusText, data: null }
      }
      const data = await response.json()
      console.log("data", data)
      return {
        isOk: data?.IsSuccessful ?? false,
        message: data?.ErrorCode + data?.ErrorDesc,
        data,
      }
    } catch (error) {
      return {
        isOk: false ?? false,
        message: "Netsis Rest Servisine bağlanılamadı! => " + this.restAddress,
        data: null,
      }
    }
  }

  public async get(url: string) {
    return this.makeRequest(url)
  }
  public async post(url: string, payload: any) {
    return this.makeRequest(url, "post", payload)
  }
  public async delete(url: string) {
    return this.makeRequest(url, "delete")
  }
}
/**
 *
 */
