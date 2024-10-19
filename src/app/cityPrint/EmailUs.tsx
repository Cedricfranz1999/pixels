import React from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const UpdateCard = () => {
  return (
    <div className="my-32 flex justify-center" id="update">
      <Card className="flex w-[1300px] flex-col items-center gap-3 rounded-md bg-blue-400 px-32 py-10">
        <Label
          className="tracking-thight text-3xl text-white"
          style={{ wordSpacing: "10px" }}
        >
          Get Our Updates
        </Label>
        <Label className="leading-6 text-white">
          Stay updated with City Print's latest news and exclusive offers! By
          subscribing, you'll receive early access to our newest T-shirt designs
          and custom clothing services. Our newsletters include special
          discounts, upcoming events, and behind-the-scenes insights into our
          design process. Join our community of fashion enthusiasts and never
          miss out on our latest creations. We promise to keep you inspired and
          informed. Subscribe now and be part of the City Print family!
        </Label>
        <div className="flex w-full items-center gap-2">
          <Input
            className="min-w-full bg-white text-black"
            placeholder="Enter your email address"
          ></Input>
          <Button className=" animate-pulse bg-blue-500">Subscribe</Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCard;
