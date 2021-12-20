const TOKEN_ID_KEY = '@uron/TOKEN_ID';
const TOKEN_SVG_KEY = '@uron/TOKEN_SVG_KEY';

export const setSelectedToken = (tokenId: number, tokenSVG: string) => {
  localStorage.setItem(TOKEN_ID_KEY, tokenId.toString());
  localStorage.setItem(TOKEN_SVG_KEY, tokenSVG);
};

export const getSelectedToken = () => {
  const tokenIdRaw = localStorage.getItem(TOKEN_ID_KEY);
  const tokenSVG = localStorage.getItem(TOKEN_SVG_KEY);

  if (!tokenIdRaw) {
    return {
      tokenId: null,
      tokenSVG: null,
    };
  }

  return {
    tokenId: parseInt(tokenIdRaw),
    tokenSVG,
  };
};

export const resetSelectedToken = () => {
  localStorage.removeItem(TOKEN_ID_KEY);
  localStorage.removeItem(TOKEN_SVG_KEY);
};
