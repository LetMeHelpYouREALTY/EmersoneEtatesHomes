import type { AppProps } from 'next/app';
import ErrorBoundary from '@/components/ErrorBoundary';
import Analytics from '@/components/Analytics';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Analytics />
      <PerformanceMonitor />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}