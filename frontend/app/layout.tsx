import StoreProvider from './lib/store/provider'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  )
}
