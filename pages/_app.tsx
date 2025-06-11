import type { AppProps } from 'next/app';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../styles/globals.css';
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Client-side initialization
    console.log('App initialized on client');
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}