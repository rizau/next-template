import NRestService from "@/services/nrestService"
import { NextAuthOptions } from "next-auth"
//import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET")
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  secret:
    "31cf5c671a53b20d678a046f22a13e9b56f15f444fb88d321e25dea387996f24%7C50f2207f54518dbe22e72122fb743f2b2ac8cb8ef802493eab2053c9bb95b0f3",
  //session: { jwt: true, maxAge: 30 * 24 * 60 * 60 },
  //session: { jwt: true, maxAge: 2*60 },

  //adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
        dbname: { label: "dbname", type: "text" },
        branch: { label: "branch", type: "text" },
      },
      async authorize(credentials, req): Promise<any> {
        // Add logic here to look up the user from the credentials supplied
        let user
        if (credentials && credentials.username == "admin") {
          if (credentials.password == "riza") {
            user = {
              name: "",
              email: "",
              image: undefined,
              id: "",
              dbname: "",
              branch: "",
            }
          }
        }

        if (credentials) {
          const nrest = new NRestService()
          const result = await nrest.getToken({
            username: credentials.username,
            password: credentials.password,
            dbname: credentials.dbname,
            branch: credentials.branch,
          })
          //console.log("result", result);
          user = {
            name: result?.username,
            email: "",
            image: undefined,
            id: result?.access_token,
            dbname: result?.dbname,
            branch: result?.branchcode,
          }
        }

        //console.log("user auth", user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          //throw new Error("Bulunamadı")
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    /* GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),*/
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.user.id ?? ""
        session.user.name = token.user.name ?? ""
        session.user.email = token.user.email ?? ""
        session.user.dbname = token.user.dbname ?? ""
        session.user.branch = token.user.branch ?? ""

        //console.log("tokenrrr", token);
        //console.log("sessionrrr", session);
      }

      return session
    },
    async jwt({ token, user }) {
      // console.log("jwt token", token);

      //console.log("jwt user", user);

      if (user) {
        token.user = user
        /*
        token.user.id = user.id ?? "";
        token.user.name = user.name ?? "";
        token.user.dbname = user.dbname ?? "";
        token.user.branch = user.branch ?? "";
        token.user.email = user.email ?? "";*/
      }
      return token
    },
    /* redirect() {
      return '/arps'
    },*/
  },
}
