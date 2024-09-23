import profile from "../../assets/creed.webp";
import { ChevronsUpDown, Settings, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AccountSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-x-3 h-20 focus-visible:ring-0 hover:bg-transparent"
        >
          <Avatar>
            <AvatarImage src={profile} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="text-start">
            <h2 className="text-lg font-semibold">Adonis Creed</h2>
            <p className="text-sm text-gray-300 flex items-center">
              <span>adonis.creed@gmail.com</span>
              <span>
                <ChevronsUpDown size={14} />
              </span>
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[18rem] p-0 bg-muted border border-muted-foreground/30">
        <DropdownMenuItem className="p-4 flex items-center gap-x-5 text-muted-foreground hover:!bg-muted-foreground/10 hover:text-foreground border-b border-muted-foreground/30">
          <UserCog />
          <span className="text-base">Manage accounts</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-4 flex items-center gap-x-5 text-muted-foreground hover:!bg-muted-foreground/10 hover:text-foreground border-b border-muted-foreground/30">
          <Settings />
          <span className="text-base">Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountSettings;
