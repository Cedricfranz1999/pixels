import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { MessageSquareText } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const Messenger = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card className=" flex items-center gap-4 px-4 py-1 shadow-sm drop-shadow-sm ">
          <MessageSquareText className=" text-orange-500" />
          <Label className="  font-bold text-orange-500">Chat</Label>
        </Card>
      </PopoverTrigger>
      <PopoverContent className=" w-80">
        <CardContent className="">weqweqwewq</CardContent>
      </PopoverContent>
    </Popover>
  );
};

export default Messenger;
