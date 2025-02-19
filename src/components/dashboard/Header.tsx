import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "../auth/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <div className="w-full h-24 shadow-lg flex items-center justify-end gap-4 pr-10">
      <div className="flex justify-center items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full overflow-hidden w-10 h-10">
              <Image
                src="https://avatar.iran.liara.run/public/boy"
                alt="logo"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User Name</p>
                <p className="text-xs leading-none text-muted-foreground">
                  email@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/user-profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
