import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
};

export function formatEtherscanLink(
  type: 'Account' | 'Transaction',
  data: [number, string]
) {
  switch (type) {
    case 'Account': {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case 'Transaction': {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBigNumber = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

export const normalizeMetadata = (tokenURIResponse: string) => {
  const metadata64 = tokenURIResponse.replace(
    'data:application/json;base64,',
    ''
  );
  const metadataBuffer = Buffer.from(metadata64, 'base64');
  const jsonData = JSON.parse(metadataBuffer.toString('utf-8'));
  return jsonData;
};

export const normalizeTokenData = (tokenData: [string, string]) => {
  const tokenHTML = tokenData[0];
  const tokenMetadata = tokenData[1];

  const fontMatches = tokenHTML.match(
    /<style>(@font-face {font-family:\'(M.*)\'.*format\(.*?;})/
  );
  let fontString = '';
  if (fontMatches[1]) {
    fontString = fontString.concat(fontMatches[1]);
  }
  const fontFamily = fontMatches[2];
  const seedMatches = tokenHTML.match(/SEED=(.*?);/);
  const seedValue = seedMatches[1];

  const {
    name,
    image: tokenSVG,
    attributes,
  } = normalizeMetadata(tokenMetadata);

  return {
    tokenHTML,
    fontFamily,
    fontString,
    seedValue,
    name,
    tokenSVG,
    attributes,
  };
};
