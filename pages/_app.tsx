// pages/_app.tsx

import type { AppProps } from 'next/app';
import '../app/globals.css'; // Import your global styles here

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;