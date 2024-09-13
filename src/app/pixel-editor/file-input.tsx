import React from "react";

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return <input type="file" multiple onChange={onChange} />;
};

export default FileInput;
