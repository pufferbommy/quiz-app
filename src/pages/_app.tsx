import '../app/globals.css'
import { AppProps } from 'next/dist/shared/lib/router/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
