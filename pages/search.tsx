import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import useTerraformsContract from '../hooks/useTerraformsContract';
import { resetSelectedToken, setSelectedToken } from '../storage/token';

function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState('');

  const router = useRouter();
  const terraformsContract = useTerraformsContract();

  useEffect(() => {
    resetSelectedToken();
  }, []);

  useEffect(() => {
    if (!loading || !terraformsContract) return;
    const getSVGDataAndRoute = async () => {
      setError(null);
      try {
        const tokenIdInt = parseInt(tokenId);
        const tokenHTML = await terraformsContract.tokenHTML(tokenId);
        const matches = tokenHTML.match(
          /<style>(@font-face {font-family:\'(M.*)\'.*format\(.*?;})/
        );
        let fontString = '';
        if (matches[1]) {
          fontString = fontString.concat(matches[1]);
        }
        const fontFamily = matches[2];

        const tokenSVG = await terraformsContract.tokenSVG(tokenId);
        const buff = Buffer.from(tokenSVG);
        const base64Data = buff.toString('base64');
        setSelectedToken(tokenIdInt, base64Data, fontString, fontFamily);
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
  }, [router, terraformsContract, tokenId, loading]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow pb-24">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={(e) => {
          console.log('calling on submit');
          e.preventDefault();
          setLoading(true);
        }}
      >
        <input
          className="outline-none bg-black text-white text-center text-3xl border-b-2 border-white-100 mb-8"
          disabled={loading}
          placeholder="Token ID"
          onChange={(e) => {
            e.preventDefault();
            setTokenId(e.target.value);
          }}
          value={tokenId}
        ></input>
        <Button disabled={loading} loading={loading} type="submit">
          <p className="text-white text-mono text-xl">Submit</p>
        </Button>
      </form>
      {error ? (
        <p className="text-purple mt-4 text-xl h-10">{error}</p>
      ) : (
        <div className="h-10"></div>
      )}
    </div>
  );
}

export default Search;
