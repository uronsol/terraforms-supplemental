import { useCallback, useState } from 'react';
import { ASCIIRenderer } from '../components/ASCIIRenderer';
import { Button } from '../components/Button';
import { GrayscaleCanvas } from '../components/GrayscaleCanvas';
import { ImageInput } from '../components/ImageInput';

function Terraform() {
  const [fileTarget, setFileTarget] = useState<
    (EventTarget & HTMLInputElement) | null
  >(null);
  const [ascii, setAscii] = useState<number[][] | null>();

  const onDraw = useCallback((ascii) => {
    setAscii(ascii);
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow pb-24">
      <h1 className="text-white text-3xl mb-4">Image to Terraform Tool</h1>
      <p className="text-white-100 text-xl w-3/5 text-center mb-4">
        To get the best image possible out of this tool multiply the height of
        your artboard by 0.6369694844 to find it&apos;s width. For square images
        you may want to adjust them due to the aspect ratio of the canvases.
      </p>
      <p className="text-white-100 text-xl w-3/5 text-center mb-8">
        Note this tool is intended to help create a starting point for your art.
        Copy the ASCII by clicking on the ASCII character and adjust the finer
        details.
      </p>
      {!fileTarget ? (
        <ImageInput
          onChange={(e) => {
            setFileTarget(e.target);
          }}
        ></ImageInput>
      ) : (
        <Button
          onClick={() => {
            setFileTarget(null);
            setAscii(null);
          }}
        >
          <p className="text-xs text-white">Reset Image</p>
        </Button>
      )}
      <div className="flex flex-row mt-12">
        {fileTarget ? (
          <GrayscaleCanvas
            fileTarget={fileTarget}
            onDraw={onDraw}
          ></GrayscaleCanvas>
        ) : null}
        {ascii ? (
          <div className="ml-8">
            <ASCIIRenderer ascii={ascii}></ASCIIRenderer>
          </div>
        ) : null}
      </div>
      <p className="text-white-100 text-xl w-3/5 text-center mt-8">
        Editing ASCII arrays with preview will be available soon.
      </p>
    </div>
  );
}

export default Terraform;
