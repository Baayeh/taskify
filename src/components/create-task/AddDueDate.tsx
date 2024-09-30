import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import {
  CalendarArrowDown,
  CalendarCheck,
  CalendarDays,
  CalendarFold,
  Trash2,
} from "lucide-react";
import { format, addDays, nextMonday } from "date-fns";
import React, { useMemo, useState } from "react";
import { displayDate } from "@/lib/utils";
import DatePicker from "../date-picker/DatePicker";

interface AddDueDateProps {
  dueDate: Date | undefined;
  setDueDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const AddDueDate: React.FC<AddDueDateProps> = ({ dueDate, setDueDate }) => {
  const [open, setOpen] = useState(false);

  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => addDays(today, 1), [today]);
  const nextMondayDate = useMemo(() => nextMonday(today), [today]);

  const dayAbbrev = format(today, "EEE");
  const tomorrowAbbrev = format(tomorrow, "EEE");
  const nextMondayAbbrev = format(nextMondayDate, "EEE");
  const isTomorrowMonday = format(tomorrow, "EEEE") === "Monday";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
              className={`font-normal flex gap-x-2 items-center rounded-md p-2 text-sm hover:bg-black/30 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-300`}
            >
              <CalendarDays size={20} />
              {dueDate ? <p>{displayDate(dueDate, today, tomorrow)}</p> : null}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[15rem] border border-muted">
              <DropdownMenuItem
                className="justify-between items-center p-3"
                onClick={() => setDueDate(today)}
              >
                <div className="flex items-center gap-x-5">
                  <CalendarCheck size={16} className="text-gray-500" />
                  <span>Today</span>
                </div>
                <p className="text-gray-500">{dayAbbrev}</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-between items-center p-3"
                onClick={() => setDueDate(tomorrow)}
              >
                <div className="flex items-center gap-x-5">
                  <CalendarArrowDown size={16} className="text-gray-500" />
                  <span>Tomorrow</span>
                </div>
                <p className="text-gray-500">{tomorrowAbbrev}</p>
              </DropdownMenuItem>
              {!isTomorrowMonday && (
                <DropdownMenuItem
                  className="justify-between items-center p-3"
                  onClick={() => setDueDate(nextMondayDate)}
                >
                  <div className="flex items-center gap-x-5">
                    <CalendarFold size={16} className="text-gray-500" />
                    <span>Next Week</span>
                  </div>
                  <p className="text-gray-500">{nextMondayAbbrev}</p>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DatePicker setDate={setDueDate} setOpen={setOpen} />
              </DropdownMenuItem>
              {dueDate && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-x-5 p-3 text-red-500 hover:!text-red-500"
                    onClick={() => setDueDate(undefined)}
                  >
                    <Trash2 size={16} />
                    <span>Remove due date</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent className="bg-muted shadow-md shadow-black/50">
          Add due date
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddDueDate;
