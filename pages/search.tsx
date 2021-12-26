import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import useTerraformsContract from '../hooks/useTerraformsContract';
import useMetadataContract from '../hooks/useMetadataContract';
import { resetSelectedToken, setSelectedToken } from '../storage/token';
import { normalizeTokenData } from '../util';
import { TERRAFORMS_ADDRESS } from '../lib';
import { useWeb3React } from '@web3-react/core';

function Search() {
  const { account, library } = useWeb3React();
  const isConnected = typeof account === 'string' && !!library;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState('');

  const router = useRouter();
  const terraformsContract = useTerraformsContract();
  const metadataContract = useMetadataContract(TERRAFORMS_ADDRESS);

  useEffect(() => {
    resetSelectedToken();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setError(
        'You must connect a wallet in the upper right hand corner in order to use the search function.'
      );
      return;
    }
    setError(null);
  }, [isConnected]);

  useEffect(() => {
    if (!loading || !terraformsContract) return;
    const getSVGDataAndRoute = async () => {
      setError(null);
      try {
        const tokenIdInt = parseInt(tokenId);

        const contractCalls = await Promise.all([
          terraformsContract.tokenHTML(tokenId),
          metadataContract.tokenURI(tokenId),
        ]);

        setSelectedToken({
          tokenId: tokenIdInt,
          ...normalizeTokenData(contractCalls),
        });
        setLoading(false);
        router.push({
          pathname: '/supplemental',
        });
      } catch (err) {
        console.error(err);
        setError(
          'An error occured. Please check your token id and only use numeric values.'
        );
        setLoading(false);
      }
    };
    getSVGDataAndRoute();
  }, [router, terraformsContract, tokenId, loading, metadataContract]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow pb-24">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
        }}
      >
        <input
          className="outline-none bg-black text-white text-center text-3xl border-b-2 border-white-100 mb-8"
          disabled={loading || !isConnected}
          placeholder="Token ID"
          onChange={(e) => {
            e.preventDefault();
            setTokenId(e.target.value);
          }}
          value={tokenId}
        ></input>
        <Button
          disabled={loading || !isConnected}
          loading={loading}
          type="submit"
        >
          <p className="text-white text-mono text-xl">
            {!isConnected ? 'Please Connect Wallet' : 'Submit'}
          </p>
        </Button>
      </form>
      {error ? (
        <p className="text-red mt-8 text-xl h-10 text-center w-1/2">{error}</p>
      ) : (
        <div className="h-10"></div>
      )}
    </div>
  );
}

export default Search;
