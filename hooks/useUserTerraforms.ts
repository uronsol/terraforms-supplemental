import { formatUnits } from "@ethersproject/units";
import { useEffect, useState } from "react";
import useSWR from "swr";
import type { ERC20, Terraforms } from "../contracts/types";
import { TERRAFORMS_ADDRESS } from "../lib";
import { parseBigNumber } from "../util";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTerraformsContract from "./useTerraformsContract";
import useTokenBalance from "./useTokenBalance";

export interface NormalizedTerraform {
  tokenId: number,
  tokenSVG: string
}

async function getTerraforms(contract: Terraforms, address: string, balance: number): Promise<Array<NormalizedTerraform>> {
  const terraforms: Array<NormalizedTerraform> = []
  for (let i = 0; i < balance; i++) {
    const tokenIdBN = await contract.tokenOfOwnerByIndex(address, i)
    const tokenId = parseInt(parseBigNumber(tokenIdBN, 0, 0))
    console.log(tokenId)
    const tokenSVG = await contract.tokenSVG(tokenIdBN)
    terraforms.push({
      tokenId,
      tokenSVG
    })
  }
  return terraforms;
}

export interface UserTerraforms {
  terraforms: Array<NormalizedTerraform>;
  balance: number;
}

export default function useGetUserTerraforms(
  address: string,
  suspense = false
): UserTerraforms {
  const [terraforms, setTerraforms] = useState<Array<NormalizedTerraform>>([])
  const [balance, setBalance] = useState<number>(0)

  const terraformsContract = useTerraformsContract();
  const tokenBalance = useTokenBalance(address, TERRAFORMS_ADDRESS)

  useEffect(() => {
    const { data, error } = tokenBalance
    if (!data || error) return
    setBalance(parseInt(formatUnits(data, 0)))
  }, [tokenBalance])

  useEffect(() => {
    const fetchTerraforms = async () => {
      const terraforms = await getTerraforms(terraformsContract, address, balance)
      setTerraforms(terraforms)
    }
    fetchTerraforms()
  }, [address, balance, terraformsContract])

  console.log({
    terraforms,
    balance
  })
  return {
    terraforms,
    balance
  }
}
