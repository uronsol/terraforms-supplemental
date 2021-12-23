import { DetailedHTMLProps, InputHTMLAttributes, useRef } from 'react';
import Loader from 'react-loader-spinner';

interface ImageInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  loading?: boolean;
}

const ImageInput = ({
  onChange,
  className,
  loading = false,
  ...extraProps
}: ImageInputProps) => {
  const fileInput = useRef(null);

  return (
    <>
      <button
        className={`bg-black text-white border-white border font-mono py-2 px-4 rounded text-xs ${className}`}
        onClick={() => {
          if (!fileInput.current) return;
          fileInput.current.click();
        }}
      >
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
          </div>
        ) : (
          'Upload Image'
        )}
      </button>
      <input
        ref={fileInput}
        onChange={onChange}
        type="file"
        accept="image/png, image/jpeg"
        style={{
          display: 'none',
        }}
        {...extraProps}
      ></input>
    </>
  );
};

export { ImageInput };
