import Image from 'next/image';
import Loader from 'react-loader-spinner';
import useSupplementalTerraformData from '../hooks/useSupplementalTerraformData';
import { Button } from './Button';

interface Props {
  tokenId: number;
  tokenSVG: string;
  onClear: () => void;
}

const SupplementalTokenData = ({ onClear, tokenId, tokenSVG }: Props) => {
  const { loading, supplementalData } = useSupplementalTerraformData(tokenId);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow mt-24">
        <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        <p className="text-white text-2xl">
          {"Fetching your terraform's data, please wait..."}
        </p>
      </div>
    );
  }

  if (!loading && !supplementalData) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow mt-24">
        <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        <p className="text-white text-2xl">
          Could not fetch your supplemental data!
        </p>
        <div className="mt-4">
          <Button onClick={onClear}>Clear Selected Terraform</Button>
        </div>
      </div>
    );
  }

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
  } = supplementalData;

  return (
    <div className="flex flex-col pt-8 mb-24">
      <div className="flex flex-row flex-wrap">
        <div
          className="flex flex-col"
          style={{
            width: 291,
          }}
        >
          <h1 className="text-white mb-4 text-3xl">{`Terraform ${tokenId}`}</h1>
          <Image
            width={291}
            height={420}
            src={`data:image/svg+xml;base64,${tokenSVG}`}
            alt=""
          />
        </div>
        <div className="flex flex-col ml-8">
          <h2 className="text-white text-3xl">Attributes</h2>
          <table className="table-auto mt-6">
            <tr>
              <td className="text-white-100 font-bold text-xl w-48">
                Elevation
              </td>
              <td className="text-white text-xl w-32">{elevation}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">Level</td>
              <td className="text-white text-xl">{level}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">Zone Name</td>
              <td className="text-white text-xl">{zoneName}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">Structure X</td>
              <td className="text-white text-xl">{structureSpaceX}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">Structure Y</td>
              <td className="text-white text-xl">{structureSpaceY}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">Structure Z</td>
              <td className="text-white text-xl">{structureSpaceZ}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">X Coordinate</td>
              <td className="text-white text-xl">{xCoordinate}</td>
            </tr>
            <tr>
              <td className="text-white-100 font-bold text-xl">Y Coordinate</td>
              <td className="text-white text-xl">{yCoordinate}</td>
            </tr>
          </table>
        </div>
        <div>
          <Button onClick={onClear}>Clear Selected Terraform</Button>
        </div>
      </div>
      <div className="flex flex-col mt-12">
        <h2 className="text-white text-3xl">Characters</h2>
        <div className="flex flex-row mt-6">
          {characterSet.map((character) => (
            <p
              key={`${character}`}
              className="font-mono text-white-100 px-4 text-6xl"
            >
              {character}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-12">
        <h2 className="text-white text-3xl">Zone Colors</h2>
        <div className="flex flex-row mt-6 flex-wrap">
          {zoneColors.map((zoneColor) => (
            <div
              className="flex flex-col items-center text-l pr-4"
              key={`${zoneColor}`}
            >
              <p className="text-white-100">{zoneColor}</p>
              <div
                style={{
                  backgroundColor: zoneColor,
                  width: 100,
                  height: 150,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplementalTokenData;
