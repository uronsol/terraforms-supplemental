const TOKEN_ID_KEY = '@uron/TOKEN_ID';
const TOKEN_SVG_KEY = '@uron/TOKEN_SVG_KEY';
const TOKEN_HTML_KEY = '@uron/TOKEN_HTML_KEY';
const FONT_STRING_KEY = '@uron/FONT_STRING_KEY';
const FONT_NAME_KEY = '@uron/FONT_NAME_KEY';
const SEED_VALUE_KEY = '@uron/SEED_VALUE_KEY';

export const setSelectedToken = (
  tokenId: number,
  tokenSVG: string,
  tokenHTML: string,
  fontString: string,
  fontName: string,
  seedValue: string
) => {
  localStorage.setItem(TOKEN_ID_KEY, tokenId.toString());
  localStorage.setItem(TOKEN_SVG_KEY, tokenSVG);
  localStorage.setItem(TOKEN_HTML_KEY, tokenHTML);
  localStorage.setItem(FONT_STRING_KEY, fontString);
  localStorage.setItem(FONT_NAME_KEY, fontName);
  localStorage.setItem(SEED_VALUE_KEY, seedValue);
};

export const getSelectedToken = () => {
  const tokenIdRaw = localStorage.getItem(TOKEN_ID_KEY);
  const tokenSVG = localStorage.getItem(TOKEN_SVG_KEY);
  const tokenHTML = localStorage.getItem(TOKEN_HTML_KEY);
  const fontString = localStorage.getItem(FONT_STRING_KEY);
  const fontName = localStorage.getItem(FONT_NAME_KEY);
  const seedValue = localStorage.getItem(SEED_VALUE_KEY);

  if (!tokenIdRaw) {
    return {
      tokenId: null,
      tokenSVG: null,
    };
  }

  return {
    tokenId: parseInt(tokenIdRaw),
    tokenSVG,
    tokenHTML,
    fontString,
    fontName,
    seedValue,
  };
};

export const resetSelectedToken = () => {
  localStorage.removeItem(TOKEN_ID_KEY);
  localStorage.removeItem(TOKEN_SVG_KEY);
  localStorage.removeItem(TOKEN_HTML_KEY);
  localStorage.removeItem(FONT_STRING_KEY);
  localStorage.removeItem(FONT_NAME_KEY);
  localStorage.removeItem(SEED_VALUE_KEY);
};
