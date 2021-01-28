import { AppProps } from 'next/app';
import '../styles/index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
