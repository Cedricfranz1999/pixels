import { CircleUser } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="z-10 flex h-14 w-full items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={() => handleProfile()}>Profile</DropdownMenuItem> */}
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
