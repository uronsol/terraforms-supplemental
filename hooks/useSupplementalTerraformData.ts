import { useEffect, useState } from 'react';
import { parseBigNumber } from '../util';
import useTerraformsContract from './useTerraformsContract';

interface TerraformSupplementalData {
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

export default function useSupplementalTerraformData(tokenId: string) {
  const [loading, setLoading] = useState(true);
  const [supplementalData, setSupplementalData] =
    useState<TerraformSupplementalData | null>(null);

  const terraformsContract = useTerraformsContract();

  useEffect(() => {
    const fetchSupplemental = async () => {
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
      } = await terraformsContract.tokenSupplementalData(tokenId);
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
  }, [terraformsContract, tokenId]);

  return {
    loading,
    supplementalData,
  };
}
