import { useCallback, useState } from 'react';
import { ASCIIRenderer } from '../components/ASCIIRenderer';
import { Button } from '../components/Button';
import { GrayscaleCanvas } from '../components/GrayscaleCanvas';
import { ImageInput } from '../components/ImageInput';

const lineFeed = '&#10;';

function Terraform() {
  const [fileTarget, setFileTarget] = useState<
    (EventTarget & HTMLInputElement) | null
  >(null);
  const [ascii, setAscii] = useState<number[][] | null>();
  const [editorAscii, setEditorAscii] = useState<string[] | null>();
  const [drawingEnabled, setDrawingEnabled] = useState(false);

  const onDraw = useCallback((ascii) => {
    setAscii(ascii);
    const textArray = ascii.map((asciiArray) => {
      return asciiArray.join('');
    });
    const editorValue = textArray.reduce((totalVal, nextVal) => {
      return totalVal.concat(lineFeed).concat(nextVal);
    }, '');
    console.log(editorValue);
    setEditorAscii(editorValue);
  }, []);

  const handleDrawChange = useCallback((nextAscii) => {
    console.log(nextAscii);
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow pb-24">
      <h1 className="text-white text-3xl mb-4">Image to Terraform Tool</h1>
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
      <div className="flex flex-row items-center justify-center mt-12 w-full">
        {fileTarget ? (
          <div
            style={{
              height: 500,
              width: 318,
            }}
          >
            {drawingEnabled ? (
              <input
                type="textarea"
                className="whitespace-pre-line"
                style={{
                  minWidth: 325,
                  minHeight: 512,
                }}
                value={editorAscii}
                onChange={(e) => {
                  handleDrawChange(e.target.value);
                }}
              ></input>
            ) : (
              <GrayscaleCanvas
                fileTarget={fileTarget}
                onDraw={onDraw}
              ></GrayscaleCanvas>
            )}
          </div>
        ) : null}
        {ascii ? (
          <div className="ml-8">
            <ASCIIRenderer ascii={ascii}></ASCIIRenderer>
          </div>
        ) : null}
      </div>
      {/* {fileTarget ? (
        <Button
          className="mt-8"
          onClick={() => {
            setDrawingEnabled(true);
          }}
        >
          <p className="text-xl text-white">Edit</p>
        </Button>
      ) : null} */}
      <p className="text-white-100 text-xl w-3/5 text-center mb-8 mt-8">
        To get the best image possible out of this tool multiply the height of
        your artboard by 0.6929 to find it&apos;s width. For square images you
        may want to adjust (squish y) them due to the aspect ratio of the
        canvases.
      </p>
      <p className="text-white-100 text-xl w-3/5 text-center mb-8">
        Note this tool is intended to help create a starting point for your art.
        Copy the ASCII by clicking on the ASCII character and adjust the finer
        details.
      </p>
      <p className="text-white-100 text-xl w-3/5 text-center mb-8">
        I assume no responsibility for what you create with this tool, do with
        your Terraforms, and I do not provide support.
      </p>
      <p className="text-white-100 text-xl w-3/5 text-center">
        Editing ASCII arrays with preview will be available shortly.
      </p>
    </div>
  );
}

export default Terraform;
