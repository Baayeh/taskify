import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { CalendarClock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TimePicker from "./TimePicker";
import { timeRegex } from "../create-task/CreateTask";
import { parseTimeAndSet } from "@/lib/utils";

interface DatePickerProps {
  setDate: (date: Date | undefined) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTime?: boolean;
  isFromContextMenu?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  setDate,
  setOpen,
  addTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState<"am" | "pm">("am");

  const time = `${hours}:${minutes}${period}`;

  const timeMatch = useMemo(() => timeRegex.exec(time), [time]);

  const clearTime = () => {
    setHours("00");
    setMinutes("00");
    setPeriod("am");
  };

  useEffect(() => {
    if (!addTime) return;

    const newDate = parseTimeAndSet(selectedDate ?? new Date(), timeMatch);

    // Prevent unnecessary state updates
    if (selectedDate?.getTime() !== newDate.getTime()) {
      setSelectedDate(newDate);
    }
  }, [selectedDate, addTime]);

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className="gap-x-5 px-3 py-5 w-full justify-start"
        >
          <CalendarClock size={16} className="text-gray-500" />
          <span>{addTime ? "Pick a date & time" : "Pick a date"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        {addTime && (
          <TimePicker
            hours={hours}
            minutes={minutes}
            period={period}
            setHours={setHours}
            setMinutes={setMinutes}
            setPeriod={setPeriod}
          />
        )}
        <div className="flex justify-between gap-x-3 p-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              setDate(undefined);
              setOpen(false);
              clearTime();
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              setDate(selectedDate);
              setOpen(false);
              clearTime();
            }}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
