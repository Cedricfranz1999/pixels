"use client";
import React, { useState, useRef } from "react";
import FileInput from "./file-input";
import FileImage from "./file-image";
import { Editor } from "@pixlrlte/pixlr-sdk";
import { Label } from "~/components/ui/label";

interface PixelEditorProps {
  token: string;
}

interface CurrentFile {
  open: boolean;
  file: File;
}

const PixelPage: React.FC<PixelEditorProps> = ({ token }) => {
  const [currentFiles, setCurrentFiles] = useState<CurrentFile[]>([]);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const filesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setCurrentFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(files).map((file) => ({ open: false, file })),
      ]);
    }
  };

  const openFile = async (file: File, idx: number) => {
    if (!editor && frameRef.current) {
      setLoading(true);
      const newEditor = await Editor.connect(token, frameRef.current);
      setEditor(newEditor);
      setLoading(false);
    }

    if (editor) {
      setCurrentFiles((prevFiles) => {
        return prevFiles.map((data, index) => ({
          file: data.file,
          open: index === idx,
        }));
      });

      for await (const newFile of editor.open(file)) {
        setCurrentFiles((prevFiles) => {
          return prevFiles.map((data, index) => ({
            file: index === idx ? (newFile as File) : data.file,
            open: index === idx,
          }));
        });
      }
      setLoading(false);

      setCurrentFiles((prevFiles) => {
        return prevFiles.map((data, index) => ({
          file: data.file,
          open: false,
        }));
      });
    }
  };

  // Trigger file download
  const handleDownload = () => {
    const openFile = currentFiles.find((file) => file.open);
    if (openFile) {
      const url = URL.createObjectURL(openFile.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = openFile.file.name; // Set the download name to the original file name
      a.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  console.log("CURRENTFILES ", currentFiles);

  return (
    <section className=" flex  w-full  flex-col  ">
      {loading ? (
        <p>loading....</p>
      ) : (
        <div className={`${currentFiles[0]?.open === true ? "hidden" : ""}`}>
          <FileInput onChange={filesChanged} />

          <div className="images gap-1.25 mt-2.5 grid grid-cols-2 grid-rows-[150px]  pb-96">
            {currentFiles.map(({ open, file }, i) =>
              open ? (
                <div key={i} className="saturate-0 filter">
                  <FileImage file={file} />
                </div>
              ) : (
                <button key={i} onClick={() => openFile(file, i)}>
                  <FileImage file={file} />
                </button>
              ),
            )}
          </div>
        </div>
      )}
      {/* Customize save and download functionality */}
      <div
        className={`absolute  right-14 top-[110px] z-50 flex h-8 w-40 cursor-pointer items-center justify-center rounded-md border-2 border-[#9c9b9b] bg-orange-500 shadow-lg drop-shadow-md hover:brightness-150 ${
          currentFiles[0]?.open === true ? "" : "hidden"
        }`}
        onClick={handleDownload} // Trigger download on click
      >
        <Label className="cursor-pointer font-semibold text-white">
          SAVE CHANGES
        </Label>
      </div>

      <iframe
        src={`https://pixlr.com/editor/?token=${token}`}
        ref={frameRef}
        className={`border-tiffany-blue relative h-screen w-full border-2 ${
          currentFiles[0]?.open === true ? "" : "hidden"
        }`}
      />
    </section>
  );
};

export default PixelPage;
