import '../styles/globals.css'
import { AppContextProvider } from './context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppContextProvider>
  )
}
