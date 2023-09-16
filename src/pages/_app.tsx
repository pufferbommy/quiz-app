import { AppProps } from 'next/app';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="px-3">
      <div className="max-w-md relative mx-auto pt-36">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
