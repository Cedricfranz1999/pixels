"use client";

import { UploadButton } from "~/utils/uploadthing";
import { UploadDropzone } from "~/utils/uploadthing";

export default function UploadFile() {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
