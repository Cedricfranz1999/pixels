"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useState } from "react";
import { api } from "~/trpc/react";
import { type Walk_In } from "~/types/walkin";
import Walk_InForm from "~/app/_components/walk_in/form";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";

const WalkIn = () => {
  const [searchKey, setSearchKey] = useState("");
  const [open, setOpen] = useState(false);
  const [walk_in, setWalk_In] = useState<Walk_In | null>(null);

  const { data, isLoading, refetch } = api.walk_in.getAllWalk_Ins.useQuery({
    search: searchKey,
  });

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    await refetch();
  };

  const handleEditWalkIn = (walk_in: Walk_In) => {
    setOpen(true);
    setWalk_In(walk_in);
  };
  return (
    <div className="space-y-6">
      <Walk_InForm
        open={open}
        setOpen={setOpen}
        refetch={refetch}
        walk_In={walk_in}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Walk Ins</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            List of all walk in.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-x-4">
            <div className="w-full lg:w-[30%]">
              <Input
                value={searchKey}
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                placeholder="Search..."
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                className="h-8 gap-1"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add walk in
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data?.map((walk_in: Walk_In, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          className="h-[65px] w-[65px] rounded-md"
                          src={
                            walk_in.image
                              ? walk_in.image
                              : "https://ui.shadcn.com/placeholder.svg"
                          }
                          alt=""
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {walk_in.customer}
                      </TableCell>
                      <TableCell>{walk_in.quantity}</TableCell>
                      <TableCell>{walk_in.price}</TableCell>
                      <TableCell>{walk_in.description}</TableCell>
                      <TableCell className="w-20">
                        <div className="flex items-start justify-start gap-3">
                          <Button
                            variant={"secondary"}
                            onClick={() => handleEditWalkIn(walk_in)}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="py-10 text-center">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalkIn;
