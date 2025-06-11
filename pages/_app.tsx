
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Client-side initialization
    console.log('App initialized on client');
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
