import ERC721Metadata_ABI from '../contracts/ERC721Metadata.json';
import type { ERC721Metadata } from '../contracts/types';
import useContract from './useContract';

export default function useMetadataContract(tokenAddress?: string) {
  return useContract<ERC721Metadata>(tokenAddress, ERC721Metadata_ABI);
}
