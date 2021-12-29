import { useEffect, useState } from 'react';
import { parseBigNumber } from '../util';
import useTerraformsContract from './useTerraformsContract';

export interface TerraformSupplementalData {
  characterSet: Array<string>;
  elevation: string;
  level: string;
  structureSpaceX: string;
  structureSpaceY: string;
  structureSpaceZ: string;
  xCoordinate: string;
  yCoordinate: string;
  zoneColors: string[];
  zoneName: string;
}

export default function useSupplementalTerraformData(
  tokenId: number,
  skip = false
) {
  const [loading, setLoading] = useState(true);
  const [supplementalData, setSupplementalData] =
    useState<TerraformSupplementalData | null>(null);

  const terraformsContract = useTerraformsContract();

  useEffect(() => {
    if (skip || !tokenId || !terraformsContract) return;
    const fetchSupplemental = async () => {
      const data = await terraformsContract.tokenSupplementalData(tokenId);

      if (!data) return;

      const {
        characterSet,
        elevation,
        level,
        structureSpaceX,
        structureSpaceY,
        structureSpaceZ,
        xCoordinate,
        yCoordinate,
        zoneColors,
        zoneName,
      } = data;
      console.log(characterSet);
      setSupplementalData({
        characterSet,
        elevation: parseBigNumber(elevation, 0, 0),
        level: parseBigNumber(level, 0, 0),
        structureSpaceX: parseBigNumber(structureSpaceX, 0, 0),
        structureSpaceY: parseBigNumber(structureSpaceY, 0, 0),
        structureSpaceZ: parseBigNumber(structureSpaceZ, 0, 0),
        xCoordinate: parseBigNumber(xCoordinate, 0, 0),
        yCoordinate: parseBigNumber(yCoordinate, 0, 0),
        zoneColors,
        zoneName,
      });
      setLoading(false);
    };
    fetchSupplemental();
  }, [terraformsContract, tokenId, skip]);

  return {
    loading,
    supplementalData,
  };
}
