import '../styles/globals.css';
import '../styles/responsiveImage.scss';
import 'tailwindcss/tailwind.css';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import getLibrary from '../getLibrary';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="bg-black flex flex-col items-center min-h-screen">
        <Header pageProps={pageProps} />
        <div className="bg-black flex flex-col flex-grow px-10">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
