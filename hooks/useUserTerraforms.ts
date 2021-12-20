import { formatUnits } from '@ethersproject/units';
import { useEffect, useState } from 'react';

import { TERRAFORMS_ADDRESS } from '../lib';
import { parseBigNumber } from '../util';
import useTerraformsContract from './useTerraformsContract';
import useTokenBalance from './useTokenBalance';

export interface NormalizedTerraform {
  tokenId: number;
  tokenSVG: string;
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
        const tokenSVG = await terraformsContract.tokenSVG(tokenIdBN);
        terraforms.push({
          tokenId,
          tokenSVG,
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
