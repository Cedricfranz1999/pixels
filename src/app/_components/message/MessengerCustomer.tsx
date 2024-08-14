"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { MessageSquareText } from "lucide-react";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";

const MessengerCustomer = () => {
  const [customerId, setCustomerId] = useState<string>();

  const [textContent, setTextContent] = useState<string>();

  const { toast } = useToast();

  const { user } = useUser();

  const { data: userData, refetch } = api.messenger.getUser.useQuery();
  const {
    data: customerMessage,
    refetch: customerRefetch,
    isLoading,
  } = api.messenger.getMessage.useQuery(
    { customerId: user?.id },
    { enabled: !!user?.id },
  );

  const { mutate, isPending } = api.messenger.sendMessage.useMutation({
    onSuccess: () => {
      setTextContent("");

      customerRefetch();
    },
    onError: (e) => {
      toast({
        title: `${e}`,
        description: `${e}`,
      });
      refetch();
    },
  });

  const combinedDatas = [
    ...(customerMessage?.messagesSent.map((data) => data) || []),

    ...(customerMessage?.messagesReceived.map((data) => data) || []),
  ];

  const combinedData = combinedDatas.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const handleSubmitMessage = async () => {
    await mutate({
      content: textContent || "",
      recipientId: customerId || "",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Card className=" flex items-center gap-4 px-4 py-1 shadow-sm drop-shadow-sm ">
          <MessageSquareText className=" text-orange-500" />
          <Label className="  font-bold text-orange-500">Chat</Label>
        </Card>
      </PopoverTrigger>
      <PopoverContent className=" w-[600px]    ">
        <CardContent className="">
          <div className=" flex gap-5">
            <Card className=" rounded-md  border-2     px-2  py-6 pb-3 pt-3 shadow-sm drop-shadow-md">
              <Label className=" text-xl  font-bold text-blue-400">admin</Label>

              {customerMessage ? (
                <Card className="  max-h-96 min-h-96 w-[500px] overflow-scroll  border-2 border-[#f1f0f0]   pr-4 ">
                  {combinedData.length !== 0 ? (
                    combinedData.map((data) => {
                      return (
                        <div
                          className={`  ${data.sender?.firstname != "admin" ? "float-left" : "float-end"}  my-4 flex  w-3/4 items-center gap-2  `}
                        >
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Label
                            className={`    min-w-56   rounded-3xl bg-gray-400 p-3 text-xs font-light leading-5 text-white ${data.sender?.firstname !== "admin" ? "bg-blue-400" : "bg-gray-400"}  `}
                          >
                            {data.content}
                          </Label>
                        </div>
                      );
                    })
                  ) : (
                    <Card className="  flex max-h-96 min-h-96 w-[500px]  items-center  justify-center overflow-scroll border-2 border-[#f1f0f0]   ">
                      <Label className="   text-gray-500">
                        No avaible Message...
                      </Label>
                    </Card>
                  )}
                </Card>
              ) : (
                <Card className="  flex max-h-96 min-h-96 w-[500px]  items-center  justify-center overflow-scroll border-2 border-[#f1f0f0]   ">
                  {customerId ? (
                    <Label className="  text-gray-500 ">loading...</Label>
                  ) : (
                    <Label className="  animate-pulse  text-gray-500">
                      Please select message in the left side..
                    </Label>
                  )}
                </Card>
              )}

              <div className=" my-5 flex w-full items-end gap-3">
                <Textarea
                  onChange={(e) => {
                    setTextContent(e.target.value);
                  }}
                  value={textContent}
                  placeholder="message admin"
                ></Textarea>
                <Button
                  disabled={
                    customerId === "" ||
                    isPending ||
                    isLoading ||
                    !customerMessage
                  }
                  // disabled={customerId !== "" || !isPending || !isLoading}
                  onClick={handleSubmitMessage}
                  className=" bg-blue-400 hover:bg-blue-500"
                >
                  Send
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </PopoverContent>
    </Popover>
  );
};

export default MessengerCustomer;
