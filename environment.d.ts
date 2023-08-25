declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      HOSTNAME: string
      PORT: number
      NREST_ADDRESS: string
      NREST_DBUSER: string
      NREST_DBPASSWORD: string

      DB_HOST: string
      DB_USER: string
      DB_PASSWORD: string
      DB_NAME: string

      NEXT_PUBLIC_DBNAME: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
