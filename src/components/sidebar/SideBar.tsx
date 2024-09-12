import { ListPlus, Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AccountSettings from "./AccountSettings";
import MenuList from "./MenuList";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SideBar = () => {
  return (
    <nav id="sidebar" className="fixed hidden md:block w-[20rem] h-screen">
      <AccountSettings />

      <div className="mt-1">
        <Label htmlFor="search" className="relative">
          <Input
            id="search"
            placeholder="Search..."
            className="border-muted-foreground/30 border-b-2 border-b-foreground/50 focus-visible:ring-0 focus:border-b-primary"
          />
          <Search
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </Label>
      </div>
      <ScrollArea className="relative w-full h-[calc(100vh-116px)] px-4 py-2">
        <MenuList />

        <div className="absolute left-0 bottom-10 flex items-center justify-between gap-x-3 w-full">
          <Button
            size="lg"
            variant="ghost"
            className="w-full justify-start items-center gap-x-4"
          >
            <Plus size={16} />
            <span className="text-base">New list</span>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="w-12 h-10">
                  <ListPlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </nav>
  );
};

export default SideBar;
