import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useGetUserTerraforms from "../hooks/useUserTerraforms";
import { parseBigNumber } from "../util";

const Terraforms = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { terraforms, balance } = useGetUserTerraforms(account)

  return <>
    <p>{`Terraforms Balance: ${balance}`}</p>
    {terraforms.map(terraform => {
      const buff = Buffer.from(terraform.tokenSVG);
      const base64data = buff.toString('base64');
      return (
        <div key={`${terraform.tokenId}`} style={{
          width: 388,
          height: 560
        }}>
          <img src={`data:image/svg+xml;base64,${base64data}`} alt="" />
        </div>
      )
    })}
  </>;
};

export default Terraforms;
