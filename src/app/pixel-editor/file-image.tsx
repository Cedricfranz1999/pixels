import React from "react";

interface FileImageProps {
  file: File;
}

const FileImage: React.FC<FileImageProps> = ({ file }) => {
  const imageUrl = URL.createObjectURL(file);

  return <img src={imageUrl} alt="File preview" />;
};

export default FileImage;
