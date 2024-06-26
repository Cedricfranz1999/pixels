import type { Dispatch, SetStateAction } from "react";

import { UploadDropzone } from "~/utils/uploadthing";

type UploadType = {
  setImage: Dispatch<SetStateAction<string | null>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};
const UploadFile = ({ setIsEditing, setImage }: UploadType) => {
  const handleSetImage = (url: string) => {
    setImage(url);
    setIsEditing(false);
  };
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        handleSetImage(res[0]?.url as string);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadFile;
