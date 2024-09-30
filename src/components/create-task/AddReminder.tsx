import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useMemo, useState } from "react";
import { add, addDays, set, nextMonday, format, setMinutes } from "date-fns";
import { Trash2 } from "lucide-react";
import {
  PiCaretCircleRight,
  PiCaretCircleDoubleRight,
  PiClockClockwise,
} from "react-icons/pi";
import { GrAlarm } from "react-icons/gr";
import { displayDate } from "@/lib/utils";
import DatePicker from "../date-picker/DatePicker";

interface AddReminderProps {
  reminder: Date | undefined;
  setReminder: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const AddReminder: React.FC<AddReminderProps> = ({ reminder, setReminder }) => {
  const [open, setOpen] = useState(false);

  const today = useMemo(() => new Date(), []);
  const laterToday = useMemo(() => add(today, { hours: 3 }), [today]);
  const tomorrow = useMemo(
    () => set(addDays(today, 1), { hours: 9, minutes: 0, seconds: 0 }),
    [today]
  );
  const nextMondayDate = useMemo(
    () => set(nextMonday(today), { hours: 9, minutes: 0, seconds: 0 }),
    [today]
  );

  const lateTodayAbbrev = format(setMinutes(laterToday, 0), "hh:mm a");
  const tomorrowAbbrev = format(tomorrow, "EEE, hh:mm a");
  const nextMondayAbbrev = format(nextMondayDate, "EEE, hh:mm a");
  const isTomorrowMonday = format(tomorrow, "EEEE") === "Monday";

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                className={`font-normal flex gap-x-2 items-center rounded-md p-2 text-sm hover:bg-black/30 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-300`}
              >
                <GrAlarm size={20} />
                {reminder ? (
                  <div className="flex flex-col items-start">
                    <p className="">
                      Remind me at {format(reminder, "h:mm aaa")}
                    </p>
                    <p className="text-xs">
                      {displayDate(reminder, today, tomorrow)}
                    </p>
                  </div>
                ) : null}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[16rem] border border-muted">
                <DropdownMenuItem
                  className="justify-between items-center p-3"
                  onClick={() => setReminder(laterToday)}
                >
                  <div className="flex items-center gap-x-5">
                    <PiClockClockwise size={16} className="text-gray-500" />
                    <span>Later today</span>
                  </div>
                  <p className="text-gray-500">{lateTodayAbbrev}</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="justify-between items-center p-3"
                  onClick={() => setReminder(tomorrow)}
                >
                  <div className="flex items-center gap-x-5">
                    <PiCaretCircleRight size={16} className="text-gray-500" />
                    <span>Tomorrow</span>
                  </div>
                  <p className="text-gray-500">{tomorrowAbbrev}</p>
                </DropdownMenuItem>
                {!isTomorrowMonday && (
                  <DropdownMenuItem
                    className="justify-between items-center p-3"
                    onClick={() => setReminder(nextMondayDate)}
                  >
                    <div className="flex items-center gap-x-5">
                      <PiCaretCircleDoubleRight
                        size={16}
                        className="text-gray-500"
                      />
                      <span>Next Week</span>
                    </div>
                    <p className="text-gray-500">{nextMondayAbbrev}</p>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <DatePicker setDate={setReminder} setOpen={setOpen} addTime />
                </DropdownMenuItem>
                {reminder && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="gap-x-5 p-3 text-red-500 hover:!text-red-500"
                      onClick={() => setReminder(undefined)}
                    >
                      <Trash2 size={16} />
                      <span>Remove reminder</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent className="bg-muted shadow-md shadow-black/50">
            Remind me
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default AddReminder;
