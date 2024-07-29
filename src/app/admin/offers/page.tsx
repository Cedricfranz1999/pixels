"use client";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
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
import { toast } from "~/components/ui/use-toast";
import { type Offers } from "~/types/offers";
import OffersForm from "~/app/_components/offers/form";
import { PlusIcon } from "lucide-react";

const Offers = () => {
  const [searchKey, setSearchKey] = useState("");
  const [offers, setOffers] = useState<Offers | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = api.offers.getAllOffers.useQuery({
    search: searchKey,
  });

  const deleteOffer = api.offers.deleteOffer.useMutation({
    onSuccess: async () => {
      toast({
        title: "SUCCESS",
        description: "Product successfully deleted",
      });
      await refetch();
    },
  });

  // search
  const onSearch = async (value: string) => {
    setSearchKey(value);
    await refetch();
  };

  const handleEditOffers = (offers: Offers) => {
    setOpen(true);
    setOffers(offers);
  };

  const handleDeleteOffers = async (offers: Offers) => {
    await deleteOffer.mutateAsync({
      id: offers.id,
    });
  };

  return (
    <div className="space-y-6">
      <OffersForm
        open={open}
        setOpen={setOpen}
        offers={offers}
        refetch={refetch}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Offers</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            List of all offers.
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
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="h-8 gap-1"
            >
              <PlusIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add offer
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.length ? (
                  data?.map((offer: Offers, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {offer.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {offer.description}
                      </TableCell>
                      <TableCell>{offer.price}</TableCell>
                      <TableCell className="w-20">
                        <div className="flex items-start justify-start gap-3">
                          <Button
                            variant={"secondary"}
                            onClick={() => handleEditOffers(offer)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant={"destructive"}
                            onClick={() => handleDeleteOffers(offer)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center">
                      No offers found
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

export default Offers;
