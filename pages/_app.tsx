import '../styles/globals.css';
import '../styles/responsiveImage.scss';
import 'tailwindcss/tailwind.css';
import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import getLibrary from '../getLibrary';
import { Header } from '../components/Header';

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header />
      <div className="bg-black flex flex-col flex-grow px-10">
        <Component {...pageProps} />
      </div>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
