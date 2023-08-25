import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    id: string
    name: string
    email: string
    dbname: string
    branch: string
  }
  interface Session extends DefaultSession {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string
      name: string
      email: string
      dbname: string
      branch: string
    }
  }
}
