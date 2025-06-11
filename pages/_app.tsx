import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useEffect } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}