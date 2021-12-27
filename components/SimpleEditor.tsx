import { useEffect, useState } from 'react';

interface Props {
  value: number[][];
  onChange: (ascii: number[][]) => void;
}

const SimpleEditor = ({ value, onChange }: Props) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleOnChange = (
    val: string,
    outerIndex: number,
    innerIndex: number
  ) => {
    const nextValue = value;
    // @ts-ignore this can be a string value at times
    nextValue[outerIndex][innerIndex] = val;
    setEditorValue([...nextValue]);
    if (val === '' || !/^\d$/.test(val)) {
      return;
    }
    nextValue[outerIndex][innerIndex] = parseInt(val);
    onChange([...nextValue]);
  };

  if (!editorValue) return <div />;

  return (
    <div className="flex flex-col">
      {editorValue.map((outerValue, outerIndex) => {
        return (
          <div key={`editor-${outerIndex}`} className="flex flex-row">
            {outerValue.map((value, innerIndex) => {
              return (
                <input
                  className="text-xs"
                  key={`editor-${outerIndex}-${innerIndex}`}
                  type="text"
                  value={value}
                  onChange={(e) => {
                    e.preventDefault();
                    handleOnChange(e.target.value, outerIndex, innerIndex);
                  }}
                  style={{
                    width: 10,
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { SimpleEditor };
