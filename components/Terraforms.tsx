import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import useGetUserTerraforms from '../hooks/useUserTerraforms';
import Image from 'next/image';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { setSelectedToken } from '../storage/token';

const Terraforms = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { terraforms, loading } = useGetUserTerraforms(account);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow mt-24">
        <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        <p className="text-white text-2xl mt-8">
          Fetching your terraforms, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center flex-wrap">
      {terraforms.length > 0 ? (
        terraforms.map((terraform) => {
          const buff = Buffer.from(terraform.tokenSVG);
          const base64Data = buff.toString('base64');
          return (
            <div key={`${terraform.tokenId}`}>
              <button
                className="flex flex-col items-center p-4"
                style={{
                  width: 291,
                  height: 420,
                }}
                onClick={() => {
                  setSelectedToken(
                    terraform.tokenId,
                    base64Data,
                    terraform.fontString,
                    terraform.fontFamily
                  );
                  router.push({
                    pathname: '/supplemental',
                  });
                }}
              >
                <Image
                  width={291}
                  height={420}
                  src={`data:image/svg+xml;base64,${base64Data}`}
                  alt=""
                />
                <p className="text-white">{terraform.tokenId}</p>
              </button>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow mt-24">
          <p className="text-white text-2xl mt-8">
            Terraforms not found on connected wallet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Terraforms;
