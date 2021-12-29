import { useState } from 'react';

const colorMap = {
  9: '#191919',
  8: '#333333',
  7: '#4C4C4C',
  6: '#666666',
  5: '#7F7F7F',
  4: '#999999',
  3: '#B2B2B2',
  2: '#CCCCCC',
  1: '#E5E5E5',
  0: '#FFFFFF',
};

const CELL_HEIGHT = 16;
const CELL_WIDTH = CELL_HEIGHT * 0.6369694844;

interface Props {
  ascii: number[][];
}

const ASCIIRenderer = ({ ascii }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      {ascii.map((asciiTopLevel, topLevelIndex) => {
        return (
          <div key={`asciiTopLevel-${topLevelIndex}`} className="flex flex-row">
            {asciiTopLevel.map((ascii, asciiIndex) => {
              return (
                <div
                  key={`ascii-${asciiTopLevel}-${asciiIndex}`}
                  className="flex items-center justify-center"
                  style={{
                    backgroundColor: colorMap[ascii],
                    height: CELL_HEIGHT,
                    width: CELL_WIDTH,
                  }}
                >
                  <p
                    className={`text-xs ${
                      ascii >= 6 ? 'text-white' : 'text-black'
                    }`}
                  >
                    {ascii}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { ASCIIRenderer };
