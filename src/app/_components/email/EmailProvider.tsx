"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Card } from "~/components/ui/card";
import { UploadDropzone } from "~/utils/uploadthing";
import UploadFile from "../uploader/upload";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Mail } from "lucide-react";

const EmailProvider = () => {
  const form = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_s78c1xa",
          "template_pb3esbf",
          form.current,
          "qrUVn6I8PUW7wI-7l",
        )
        .then(
          (e) => {
            console.log("SUCCESS!", e);
          },
          (error) => {
            console.log("FAILED...", error.text);
          },
        );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-center gap-3 rounded-md bg-orange-600 px-2 py-1 text-white">
          <Label className="font-seminbold text-sm text-white">Inquire</Label>
          <Mail />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px]">
        <Card className="bg shadow-sm drop-shadow-md">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex h-[700px] flex-col justify-center"
          >
            <Label className="items-center text-sm font-bold text-blue-500">
              Send your design
            </Label>
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
            <Label className="text-sm font-bold text-blue-500">Location</Label>
            <input
              className="h-8 rounded-md    border border-blue-300"
              type="text"
              name="location"
            />

            <Label className="text-sm font-bold text-blue-500">Fullname</Label>
            <input
              className="h-8 rounded-md border border-solid border-blue-300"
              name="user_fullname"
            />
            <Label className="text-sm font-bold text-blue-500">
              Contact Number
            </Label>
            <input
              className="h-8 rounded-md border border-solid border-blue-300"
              name="user_contact"
            />
            <Label className="text-sm font-bold text-blue-500">
              Email Address
            </Label>
            <input
              className="h-8 rounded-md border border-solid border-blue-300"
              name="user_email"
            />
            <Label className="text-sm font-bold text-blue-500">Message</Label>
            <textarea
              className=" h-20 rounded-md border border-solid border-blue-300"
              name="message"
            />
            <input
              type="submit"
              value="Send"
              className="mt-2 w-full rounded-sm bg-blue-500 p-2 font-bold text-white"
            />
          </form>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default EmailProvider;
