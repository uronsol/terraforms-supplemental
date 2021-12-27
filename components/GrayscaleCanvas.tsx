import React, {
  useRef,
  useEffect,
  DetailedHTMLProps,
  CanvasHTMLAttributes,
  useCallback,
} from 'react';

const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (context, width, height) => {
  const imageData = context.getImageData(0, 0, width, height);

  const grayScales = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];

    const grayScale = toGrayScale(r, g, b);
    imageData.data[i] =
      imageData.data[i + 1] =
      imageData.data[i + 2] =
        grayScale;

    grayScales.push(grayScale);
  }

  context.putImageData(imageData, 0, 0);

  return grayScales;
};

const chunkString = (str, size) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
};

// const HEIGHT_TO_WIDTH_PERCENT = 0.6369694844;
const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 318;

const HIDDEN_CANVAS_HEIGHT = 32;
const HIDDEN_CANVAS_WIDTH = 32;

const grayRamp = 'aa0123456789';

const getCharacterForGrayScale = (grayScale) => {
  const letter =
    grayRamp[Math.floor(((grayRamp.length - 1) * grayScale) / 255)];
  if (letter === 'a') return 0;
  return letter;
};

interface Props
  extends DetailedHTMLProps<
    CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {
  fileTarget: EventTarget & HTMLInputElement;
  onDraw: (ascii: number[][]) => void;
}

const GrayscaleCanvas = ({ fileTarget, onDraw, ...canvasProps }: Props) => {
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);

  const draw = useCallback(
    (context, hiddenContext) => {
      const file = fileTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          canvasRef.current.width = CANVAS_WIDTH;
          canvasRef.current.height = CANVAS_HEIGHT;
          context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            image.width * (CANVAS_WIDTH / image.width),
            image.height * (CANVAS_HEIGHT / image.height)
          );
          hiddenCanvasRef.current.width = CANVAS_WIDTH;
          hiddenCanvasRef.current.height = CANVAS_HEIGHT;
          hiddenContext.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            image.width * (HIDDEN_CANVAS_WIDTH / image.width),
            image.height * (HIDDEN_CANVAS_HEIGHT / image.height)
          );
          const grayScales = convertToGrayScales(
            hiddenContext,
            HIDDEN_CANVAS_WIDTH,
            HIDDEN_CANVAS_HEIGHT
          );
          const ascii = grayScales.reduce((ascii, grayScale) => {
            return ascii.concat(getCharacterForGrayScale(grayScale));
          }, '');
          const asciiArray = chunkString(ascii, 32).map((ascii) =>
            ascii.split('').map((n) => parseInt(n))
          );
          onDraw(asciiArray);
        };
        image.src = URL.createObjectURL(fileTarget.files[0]);
      };
      reader.readAsDataURL(file);
    },
    [fileTarget, onDraw]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const context = canvas.getContext('2d');
    const hiddenContext = hiddenCanvas.getContext('2d');
    draw(context, hiddenContext);
  }, [draw, fileTarget]);

  return (
    <>
      <canvas ref={canvasRef} {...canvasProps} />
      <canvas
        ref={hiddenCanvasRef}
        style={{
          display: 'none',
        }}
        {...canvasProps}
      />
    </>
  );
};

export { GrayscaleCanvas };
