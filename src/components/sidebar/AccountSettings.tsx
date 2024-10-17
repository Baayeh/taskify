import profile from "../../assets/creed.webp";
import { ChevronsUpDown, LogOut, Settings, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const AccountSettings = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, setOpenLogoutModal } = useAuth();

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
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
            <h2 className="text-lg font-semibold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm text-gray-300 flex items-center">
              <span>{user?.email}</span>
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
          <span className="text-base">Manage account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-4 flex items-center gap-x-5 text-muted-foreground hover:!bg-muted-foreground/10 hover:text-foreground border-b border-muted-foreground/30">
          <Settings />
          <span className="text-base">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-4 flex items-center gap-x-5 text-muted-foreground hover:!bg-muted-foreground/10 hover:text-foreground border-b border-muted-foreground/30"
          onClick={() => {
            setOpenDropdown(false);
            setOpenLogoutModal(true);
          }}
        >
          <LogOut />
          <span className="text-base">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountSettings;
