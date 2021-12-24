import useSupplementalTerraformData from '../hooks/useSupplementalTerraformData';
import Loader from 'react-loader-spinner';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSelectedToken } from '../storage/token';

function Supplemental() {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [tokenSVG, setTokenSVG] = useState<string | null>(null);
  const [tokenHTML, setTokenHTML] = useState<string | null>(null);
  const [fontString, setFontString] = useState<string | null>(null);
  const [fontName, setFontName] = useState<string | null>(null);
  const [seedValue, setSeedValue] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const { tokenId, tokenHTML, tokenSVG, fontString, fontName, seedValue } =
      getSelectedToken();
    if (!tokenId) {
      setError(true);
      return;
    }
    setTokenId(tokenId);
    setTokenSVG(tokenSVG);
    setFontString(fontString);
    setFontName(fontName);
    setSeedValue(seedValue);
    setTokenHTML(tokenHTML);
  }, []);

  const { loading, supplementalData } = useSupplementalTerraformData(
    tokenId || 0,
    !tokenId
  );

  if (error || (!loading && !supplementalData)) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow mt-24">
        <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        <p className="text-white text-2xl">
          Could not fetch your supplemental data! Please make sure that this
          token exists.
        </p>
      </div>
    );
  }

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
          <div dangerouslySetInnerHTML={{ __html: tokenHTML }}></div>
          {/* <Image
            width={291}
            height={420}
            src={`data:image/svg+xml;base64,${tokenSVG}`}
            alt=""
          /> */}
        </div>
        <div className="flex flex-col ml-8 items-start">
          <h2 className="text-white text-3xl">Attributes</h2>
          <table className="table-auto mt-6 text-left">
            <tbody>
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
                <td className="text-white-100 font-bold text-xl">
                  Structure X
                </td>
                <td className="text-white text-xl">{structureSpaceX}</td>
              </tr>
              <tr>
                <td className="text-white-100 font-bold text-xl">
                  Structure Y
                </td>
                <td className="text-white text-xl">{structureSpaceY}</td>
              </tr>
              <tr>
                <td className="text-white-100 font-bold text-xl">
                  Structure Z
                </td>
                <td className="text-white text-xl">{structureSpaceZ}</td>
              </tr>
              <tr>
                <td className="text-white-100 font-bold text-xl">
                  X Coordinate
                </td>
                <td className="text-white text-xl">{xCoordinate}</td>
              </tr>
              <tr>
                <td className="text-white-100 font-bold text-xl">
                  Y Coordinate
                </td>
                <td className="text-white text-xl">{yCoordinate}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-white text-3xl mt-12">Seed Value</h2>
          <p className="text-white-100 text-2xl mt-4">{seedValue}</p>
        </div>
      </div>
      <div className="flex flex-col mt-12">
        <h2 className="text-white text-3xl text-left">
          Characters & Zone Colors
        </h2>
        <p className="text-white-100 text-xl w-3/5 mt-4 mb-8 text-left">
          There are 10 characters but the 9 index is &apos;blank&apos;.
          Characters represent elevation and correspond with a starting color as
          identified in the character set.
        </p>
        <div className="flex flex-row mt-6">
          {characterSet.map((character, index) => {
            const color = zoneColors[index];
            return (
              <div
                className="flex flex-col pr-6"
                key={`${character}-${index}`}
                style={{
                  width: 100,
                }}
              >
                <p className="text-white-100 text-center mb-1">{color}</p>
                <p
                  className="text-6xl text-center"
                  style={{
                    color,
                    fontFamily: fontName,
                  }}
                >
                  <style
                    dangerouslySetInnerHTML={{ __html: fontString }}
                  ></style>
                  {character}
                </p>
                <p className="text-white-100 text-center mt-4">{index}</p>
              </div>
            );
          })}
          <div
            className="flex flex-col items-center text-l pr-6 flex-wrap"
            style={{
              width: 100,
            }}
          >
            <p className="text-white-100">{zoneColors[9]}</p>
            <div
              style={{
                backgroundColor: zoneColors[9],
                width: 60,
                height: 65,
              }}
            />
            <p className="text-white-100 text-center mt-4">9</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supplemental;
