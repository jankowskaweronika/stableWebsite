import { AppProps } from 'next/app';

import '../styles/main.css';
import CookieConsent from '../components/CookieConsent';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <CookieConsent />
  </>
);

export default MyApp;
