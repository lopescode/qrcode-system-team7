import { type AppProps } from 'next/app'
import React, { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import './globals.css'
import { Metadata } from 'next'
import RootLayout from './layout'

export const metadata: Metadata = {
  title: 'Menu Digital',
  description: 'Menú digital para restaurantes',
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    localStorage.setItem('customerId', '1')
  }, [])

  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  )
}

export default App
