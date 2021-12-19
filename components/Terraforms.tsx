import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useGetUserTerraforms from '../hooks/useUserTerraforms';
import Image from 'next/image';
import Loader from 'react-loader-spinner';

interface Props {
  onSelect: (tokenId: number, tokenSVG: string) => void;
}

const Terraforms = ({ onSelect }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { terraforms, loading } = useGetUserTerraforms(account);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow mt-24">
        <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        <p className="text-white text-2xl">
          Fetching your terraforms, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center flex-wrap">
      {terraforms.map((terraform) => {
        const buff = Buffer.from(terraform.tokenSVG);
        const base64data = buff.toString('base64');
        return (
          <button
            className="flex flex-col items-center p-4"
            onClick={(e) => {
              e.preventDefault();
              onSelect(terraform.tokenId, base64data);
            }}
            key={`${terraform.tokenId}`}
            style={{
              width: 291,
              height: 420,
            }}
          >
            <Image
              width={291}
              height={420}
              src={`data:image/svg+xml;base64,${base64data}`}
              alt=""
            />
            <p className="text-white">{terraform.tokenId}</p>
          </button>
        );
      })}
    </div>
  );
};

export default Terraforms;
