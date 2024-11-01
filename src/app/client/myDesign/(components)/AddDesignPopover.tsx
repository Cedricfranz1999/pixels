"use client";
import { useState } from "react";
import UploadFile from "~/app/_components/uploader/upload";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

const PopoverAddDesign = () => {
  const [image, setImage] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const { data, refetch } = api.client_design.getAllDeisgn.useQuery({
    isAdmin: false,
  });
  const addDesign = api.client_design.AddDesign.useMutation({
    onSuccess: () => {
      toast({
        title: "SUCCESS",
        description: "Design successfully created",
      });
      refetch();
    },
  });

  const onSubmit = async () => {
    if (image) {
      await addDesign.mutateAsync({
        description: description,
        image: image as string,
      });
    } else {
      toast({
        title: "ERROR",
        description: "please upload image",
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className=" bg-orange-500 font-bold text-white  hover:bg-orange-600"
          variant="outline"
        >
          Add custom design
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px]">
        <Card className=" flex  max-h-[600px]  flex-col gap-7 p-10">
          {image ? (
            <>
              <div className=" relative">
                <button
                  className=" absolute -top-7          left-56 z-50  rounded-sm bg-blue-500 px-2 py-1  tracking-widest text-white"
                  onClick={() => setImage("")}
                >
                  Change image
                </button>
                <img src={image || ""} className="relative" />
              </div>
              {image && <input type="hidden" name="image" value={image} />}
            </>
          ) : (
            <UploadFile setIsEditing={setEditing} setImage={setImage} />
          )}

          <div>
            <Label className=" font-bold text-blue-500">Add Description:</Label>
            <Textarea
              className=" border-blue-500` border border-solid"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <input
            onClick={onSubmit}
            type="submit"
            value="Submit"
            className="mt-2 w-full rounded-sm bg-blue-500 p-2 font-bold text-white"
          />
        </Card>
      </PopoverContent>
    </Popover>
  );
};
export default PopoverAddDesign;
