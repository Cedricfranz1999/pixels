"use client";

import React, { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "~/components/ui/use-toast";
//qqwe
import { CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
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

interface PropsData {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const MyDesignOption: React.FC<PropsData> = ({ setImage }) => {
  const { data, refetch } = api.client_design.getAllDeisgn.useQuery();
  const [id, setId] = useState<number>();
  const { toast } = useToast();

  return (
    <div className="flex     h-48 flex-col gap-10 ">
      <Carousel className=" w-96" orientation="vertical">
        <CarouselContent className="-ml-1 max-h-[200px]  min-h-[200px] max-w-96    ">
          {data?.map((data) => {
            return (
              <Card
                key={data.id}
                className="relative h-auto   w-80 cursor-pointer "
                onClick={() => setImage(data.image)}
              >
                <img
                  src={data.image}
                  width={100}
                  alt={data.description || "Design Image"}
                />
                <Label className=" rounded-sm bg-blue-500 px-4 py-1 font-bold text-white ">
                  {data.description}
                </Label>
              </Card>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MyDesignOption;
