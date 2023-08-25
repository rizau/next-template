import { ThemeProvider } from "@/components/theme-provider"

import NextAuthSessionProvider from "./session-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextAuthSessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </NextAuthSessionProvider>
    </>
  )
}
