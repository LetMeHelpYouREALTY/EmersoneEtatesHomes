
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  )
}
