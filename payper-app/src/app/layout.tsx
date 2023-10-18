'use client'

import './globals.css'

import { Inter } from 'next/font/google'

import { SafeThemeProvider } from '@safe-global/safe-react-components'
import { ThemeProvider } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SafeThemeProvider mode="dark">
      {(safeTheme) => (
          <ThemeProvider theme={safeTheme}>
            <body className={inter.className}>{children}</body>
          </ThemeProvider>
            )}
      </SafeThemeProvider>
    </html>
  )
}