'use client'
import Messenger from "../message/Messenger";
import { SignedIn, useUser, UserButton } from "@clerk/nextjs";
import { Label } from "~/components/ui/label";

const Header = () => {
    const { user } = useUser();

  return (
    <header className="z-10 flex h-14 w-full items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1"></div>
      <div className=" flex items-center gap-4">
        <Messenger />
        <SignedIn>
              <div>
                <div className="flex w-full flex-shrink-0 items-center justify-between gap-2 p-2">
                  <div className="ml-2 flex items-center justify-center space-x-2">
                    <div>
                      <UserButton afterSignOutUrl="/sign-in" />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <Label className="text-center ">
                        {user?.firstName} <br /> {user?.lastName}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </SignedIn>
      </div>
    </header>
  );
};

export default Header;
