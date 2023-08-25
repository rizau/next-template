//import { getSession } from 'next-auth/react';

//import { LogLevel, LoggerService } from './loggerService';

interface ApiResponse {
  isOk: boolean
  message: string
  data: any
}

interface User {
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

type Sessiona = { user: User }

export default class ApiService {
  public get(url: string) {
    return this.makeRequest(url)
  }
  public post(url: string, payload: any) {
    return this.makeRequest(url, "post", payload)
  }
  public delete(url: string) {
    return this.makeRequest(url, "delete")
  }

  private async makeRequest(
    url: string,
    method: string = "get",
    payload?: any
  ): Promise<ApiResponse> {
    const session: any = "" //await getSession();
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token ?? ""}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }

    if (method === "post") {
      options["body"] = JSON.stringify(payload)
    }

    try {
      const response = await fetch(`${url}`, options)
      const data = await response.json()

      console.log("api data", data)

      return data
    } catch (error) {
      //const logger = new LoggerService(LogLevel.ERROR);
      //logger.error(JSON.stringify(error, null, 2));
      return { isOk: false, message: "Api Servisinde hata!", data: error }
    }
  }
}
