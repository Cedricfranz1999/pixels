"use client";
import React, { useState, useRef } from "react";
import FileInput from "./file-input";
import FileImage from "./file-image";
import { Editor } from "@pixlrlte/pixlr-sdk";

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
      const newEditor = await Editor.connect(token, frameRef.current);
      setEditor(newEditor);
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

      setCurrentFiles((prevFiles) => {
        return prevFiles.map((data, index) => ({
          file: data.file,
          open: false,
        }));
      });
    }
  };
  console.log(currentFiles);
  return (
    <section className="grid h-full grid-cols-[400px_1fr] grid-rows-[1fr] gap-2.5">
      <div>
        <FileInput onChange={filesChanged} />

        <div className="images gap-1.25 mt-2.5 grid grid-cols-2 grid-rows-[150px]">
          {currentFiles.map(({ open, file }, i) =>
            open ? (
              <div key={i} className="saturate-0 filter">
                <FileImage file={file} />
              </div>
            ) : (
              <button
                key={i}
                onClick={() => openFile(file, i)}
                className="cursor-pointer"
              >
                <FileImage file={file} />
              </button>
            ),
          )}
        </div>
      </div>

      <iframe
        src={`https://pixlr.com/editor/?token=${token}`}
        ref={frameRef}
        className="border-tiffany-blue h-screen w-full border-2"
      />
    </section>
  );
};

export default PixelPage;
