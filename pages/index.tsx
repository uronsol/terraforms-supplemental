import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import Terraforms from '../components/Terraforms';
import { resetSelectedToken } from '../storage/token';

function Home() {
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  useEffect(() => {
    resetSelectedToken();
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow pb-24">
      {!isConnected ? (
        <h1 className="text-white text-2xl">Connect Wallet to Begin</h1>
      ) : (
        <Terraforms />
      )}
    </div>
  );
}

export default Home;
