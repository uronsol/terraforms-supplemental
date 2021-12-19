import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import SupplementalTokenData from '../components/SupplementalTokenData';
import Terraforms from '../components/Terraforms';

function Home() {
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null);
  const [selectedTokenSVG, setSelectedTokenSVG] = useState<string | null>(null);

  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  if (selectedTokenId) {
    return (
      <SupplementalTokenData
        tokenId={selectedTokenId}
        tokenSVG={selectedTokenSVG}
        onClear={() => {
          setSelectedTokenId(null);
          setSelectedTokenSVG(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col items-center flex-grow pb-24">
      {!isConnected ? (
        <h1 className="text-white text-2xl">Connect Wallet to Begin</h1>
      ) : (
        <Terraforms
          onSelect={(tokenId, tokenSvg) => {
            setSelectedTokenId(tokenId);
            setSelectedTokenSVG(tokenSvg);
          }}
        />
      )}
    </div>
  );
}

export default Home;
