import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { GrAlarm } from "react-icons/gr";
import { format } from "date-fns";
import { displayDate } from "@/lib/utils";
import {
  PiCaretCircleDoubleRight,
  PiCaretCircleRight,
  PiClockClockwise,
} from "react-icons/pi";
import DatePicker from "../date-picker/DatePicker";
import {
  CalendarArrowDown,
  CalendarCheck,
  CalendarDays,
  CalendarFold,
  Trash2,
} from "lucide-react";
import useDateInfo from "@/hooks/useDateInfo";

interface ReminderDropDownProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReminder?: boolean;
  isDetails?: boolean;
}

const SelectDate: React.FC<ReminderDropDownProps> = ({
  date,
  setDate,
  open,
  setOpen,
  isReminder,
  isDetails,
}) => {
  const {
    today,
    laterToday,
    tomorrow,
    tomorrowAt9,
    nextMondayDate,
    nextMondayAt9,
    dayAbbrev,
    lateTodayAbbrev,
    tomorrowAbbrev,
    tomorrowAt9Abbrev,
    nextMondayAbbrev,
    nextMondayAt9Abbrev,
    isTomorrowMonday,
    isTomorrowMondayAt9,
  } = useDateInfo();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={`w-full font-normal flex gap-x-2 items-center rounded-md p-2 text-sm hover:bg-black/30 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-300 ${isDetails ? "rounded h-14 bg-muted/50 hover:bg-muted gap-x-4 pl-5 pr-3" : ""} ${isDetails && date ? "rounded-s rounded-e-none" : ""}`}
        >
          {isReminder ? <GrAlarm size={20} /> : <CalendarDays size={20} />}
          {isReminder && date && (
            <div className="flex flex-col items-start">
              <p className={`${isDetails ? "text-base text-primary" : ""}`}>
                Remind me at {format(date, "h:mm aaa")}
              </p>
              <p className="text-xs">{displayDate(date, today, tomorrowAt9)}</p>
            </div>
          )}
          {isDetails && (
            <>
              {isReminder && !date && (
                <p className="text-base font-normal">Remind me</p>
              )}
              {!isReminder && !date && (
                <p className="text-base font-normal">Add due date</p>
              )}
            </>
          )}
          {!isReminder && date && <p>{displayDate(date, today, tomorrow)}</p>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[16rem] border border-muted">
        <DropdownMenuItem
          className="justify-between items-center p-3"
          onClick={() => (isReminder ? setDate(laterToday) : setDate(today))}
        >
          <div className="flex items-center gap-x-5">
            {isReminder ? (
              <>
                <PiClockClockwise size={16} className="text-gray-500" />
                <span>Later today</span>
              </>
            ) : (
              <>
                <CalendarCheck size={16} className="text-gray-500" />
                <span>Today</span>
              </>
            )}
          </div>
          <p className="text-gray-500">
            {isReminder ? lateTodayAbbrev : dayAbbrev}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between items-center p-3"
          onClick={() =>
            isReminder ? setDate(tomorrowAt9) : setDate(tomorrow)
          }
        >
          <div className="flex items-center gap-x-5">
            {isReminder ? (
              <PiCaretCircleRight size={16} className="text-gray-500" />
            ) : (
              <CalendarArrowDown size={16} className="text-gray-500" />
            )}
            <span>Tomorrow</span>
          </div>
          <p className="text-gray-500">
            {isReminder ? tomorrowAt9Abbrev : tomorrowAbbrev}
          </p>
        </DropdownMenuItem>
        {(!isTomorrowMondayAt9 || !isTomorrowMonday) && (
          <DropdownMenuItem
            className="justify-between items-center p-3"
            onClick={() => setDate(isReminder ? nextMondayAt9 : nextMondayDate)}
          >
            <div className="flex items-center gap-x-5">
              {isReminder ? (
                <PiCaretCircleDoubleRight size={16} className="text-gray-500" />
              ) : (
                <CalendarFold size={16} className="text-gray-500" />
              )}
              <span>Next Week</span>
            </div>
            <p className="text-gray-500">
              {isReminder ? nextMondayAt9Abbrev : nextMondayAbbrev}
            </p>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DatePicker
            setDate={setDate}
            setOpen={setOpen}
            addTime={isReminder}
          />
        </DropdownMenuItem>
        {!isDetails && date && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-x-5 p-3 text-red-500 hover:!text-red-500"
              onClick={() => setDate(undefined)}
            >
              <Trash2 size={16} />
              <span>{isReminder ? "Remove reminder" : "Remove due date"}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectDate;
