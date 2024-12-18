"use client";

import React, { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import PopoverAddDesign from "./(components)/AddDesignPopover";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "~/components/ui/use-toast";
//qqwe
import { CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Trash } from "lucide-react";
declare global {
  interface Window {
    showSaveFilePicker?: (
      options?: SaveFilePickerOptions,
    ) => Promise<FileSystemFileHandle>;
  }

  interface SaveFilePickerOptions {
    types?: FilePickerAcceptType[];
    excludeAcceptAllOption?: boolean;
    suggestedName?: string;
  }

  interface FilePickerAcceptType {
    description: string;
    accept: Record<string, string[]>;
  }
}

const Page = () => {
  const [id, setId] = useState<number>();

  const { toast } = useToast();

  const { data, refetch } = api.client_design.getAllDeisgn.useQuery({
    isAdmin: false,
  });
  const { mutateAsync } = api.client_design.deleteDesign.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Design successfully deleted",
      });
      void refetch();
    },
    onError: () => {
      void refetch();
      toast({
        title: "ERROR",
        description: "Server Error",
        variant: "destructive",
      });
    },
  });

  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Show the file picker to choose the save location
      const options: SaveFilePickerOptions = {
        types: [
          {
            description: "Image files",
            accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
          },
        ],
        suggestedName: filename,
      };

      if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker(options);
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();

        toast({
          description: "save changes",
        });
      } else {
        toast({
          description: "failed to save changes",
        });
      }
    } catch (error) {}
  };

  const handleDeleteDesign = async (id: number) => {
    await mutateAsync({
      id: id,
    });
  };

  return (
    <div className="flex h-screen w-full flex-col gap-10">
      <div className="flex w-full justify-between">
        <PopoverAddDesign />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((data) => {
          return (
            <Card
              key={data.id}
              className="relative h-auto"
              onMouseEnter={() => setId(data.id)}
            >
              <img
                src={data.image}
                width={1000}
                alt={data.description || "Design Image"}
              />
              <Label className="rounded-sm bg-orange-500 p-5 font-bold text-white">
                {data.description}
              </Label>
              <div
                className={`${
                  id === data.id ? "" : "hidden"
                } absolute right-0 top-0 flex gap-3`}
              >
                <Label
                  className=" cursor-pointer rounded-sm bg-blue-300 p-2 font-bold text-white hover:brightness-110"
                  onClick={() =>
                    handleDownload(data.image, `design-${data.id}.jpg`)
                  }
                >
                  Download
                </Label>
                <Trash
                  className="cursor-pointer rounded-sm bg-red-400 p-2 font-bold text-[#232b2b] hover:brightness-110"
                  size={30}
                  onClick={() => handleDeleteDesign(data.id)}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
