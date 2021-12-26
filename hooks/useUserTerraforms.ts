import { formatUnits } from '@ethersproject/units';
import { useEffect, useState } from 'react';

import { TERRAFORMS_ADDRESS } from '../lib';
import { parseBigNumber, normalizeTokenData } from '../util';
import useMetadataContract from './useMetadataContract';
import useTerraformsContract from './useTerraformsContract';
import useTokenBalance from './useTokenBalance';

export interface NormalizedTerraform {
  name: string;
  tokenId: number;
  tokenSVG: string;
  tokenHTML: string;
  fontString: string;
  fontFamily: string;
  seedValue: string;
  attributes: Record<string, string | number>[];
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
  const metadataContract = useMetadataContract(TERRAFORMS_ADDRESS);
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
    setTerraforms(() => null);

    const fetchTerraforms = async () => {
      for (let i = 0; i < balance; i++) {
        const tokenIdBN = await terraformsContract.tokenOfOwnerByIndex(
          address,
          i
        );
        const tokenId = parseInt(parseBigNumber(tokenIdBN, 0, 0));

        const contractCalls = await Promise.all([
          terraformsContract.tokenHTML(tokenId),
          metadataContract.tokenURI(tokenId),
        ]);

        setTerraforms((terras) => {
          let terraforms = terras !== null ? terras : [];
          terraforms = terraforms.concat({
            tokenId,
            ...normalizeTokenData(contractCalls),
          });
          return terraforms;
        });
        setTerraformsAreLoading(false);
      }
    };
    fetchTerraforms();
  }, [address, balance, terraformsContract, metadataContract]);

  return {
    terraforms,
    balance,
    loading: terraformsAreLoading,
  };
}
