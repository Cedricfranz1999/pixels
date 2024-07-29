"use client";

import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import PopoverAddDesign from "./(components)/AddDesignPopover";
import { toast } from "~/components/ui/use-toast";

const page = () => {
  const { data, refetch } = api.client_design.getAllDeisgn.useQuery();

  return (
    <div className=" flex h-screen w-full  flex-col gap-10 ">
      <div className="flex w-full justify-between">
        <PopoverAddDesign />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((data) => {
          return (
            <Card className=" h-auto  ">
              <img src={data.image} width={1000} />
              <Label className=" rounded-sm  bg-orange-500 p-5 font-bold text-white">
                {data.description}
              </Label>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default page;
