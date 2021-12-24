import { formatUnits } from '@ethersproject/units';
import { useEffect, useState } from 'react';

import { TERRAFORMS_ADDRESS } from '../lib';
import { parseBigNumber } from '../util';
import useTerraformsContract from './useTerraformsContract';
import useTokenBalance from './useTokenBalance';

export interface NormalizedTerraform {
  tokenId: number;
  tokenSVG: string;
  tokenHTML: string;
  fontString: string;
  fontFamily: string;
  seedValue: string;
}
export interface UserTerraforms {
  terraforms: Array<NormalizedTerraform>;
  balance: number;
  loading: boolean;
}

export default function useGetUserTerraforms(address: string): UserTerraforms {
  const [terraforms, setTerraforms] = useState<Array<NormalizedTerraform>>([]);
  const [balance, setBalance] = useState<number>(0);
  const [terraformsAreLoading, setTerraformsAreLoading] = useState(false);

  const terraformsContract = useTerraformsContract();
  const tokenBalance = useTokenBalance(address, TERRAFORMS_ADDRESS);

  useEffect(() => {
    const { data, error } = tokenBalance;
    if (!data || error) return;
    const nextBalance = parseInt(formatUnits(data, 0));
    if (nextBalance === balance) return;
    setBalance(parseInt(formatUnits(data, 0)));
  }, [tokenBalance, balance]);

  useEffect(() => {
    if (!address || !balance || balance === 0) return;
    setTerraformsAreLoading(true);
    const fetchTerraforms = async () => {
      const terraforms: Array<NormalizedTerraform> = [];
      for (let i = 0; i < balance; i++) {
        const tokenIdBN = await terraformsContract.tokenOfOwnerByIndex(
          address,
          i
        );
        const tokenId = parseInt(parseBigNumber(tokenIdBN, 0, 0));
        const tokenSVG = await terraformsContract.tokenSVG(tokenId);

        const tokenHTML = await terraformsContract.tokenHTML(tokenId);
        const matches = tokenHTML.match(
          /<style>(@font-face {font-family:\'(M.*)\'.*format\(.*?;})/
        );
        let fontString = '';
        if (matches[1]) {
          fontString = fontString.concat(matches[1]);
        }
        const fontFamily = matches[2];
        const seedMatches = tokenHTML.match(/SEED=(.*?);/);
        console.log(seedMatches);
        const seedValue = seedMatches[1];

        terraforms.push({
          tokenId,
          tokenSVG,
          tokenHTML,
          fontString,
          fontFamily,
          seedValue,
        });
      }
      setTerraforms(terraforms);
      setTerraformsAreLoading(false);
    };
    fetchTerraforms();
  }, [address, balance, terraformsContract]);

  return {
    terraforms,
    balance,
    loading: terraformsAreLoading,
  };
}
