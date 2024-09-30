import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TimePickerProps {
  hours: string;
  minutes: string;
  period: "am" | "pm";
  setHours: React.Dispatch<React.SetStateAction<string>>;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
  setPeriod: (period: "am" | "pm") => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  hours,
  minutes,
  period,
  setHours,
  setMinutes,
  setPeriod,
}) => {
  return (
    <div className="flex items-center gap-x-3 p-3">
      <Label htmlFor="hours">
        <Input
          type="number"
          id="hours"
          name="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min={0}
          max={12}
          className="w-[4rem] text-center"
        />
      </Label>
      <span>:</span>
      <Label htmlFor="minutes">
        <Input
          type="number"
          id="minutes"
          name="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min={0}
          max={59}
          className="w-[4rem] text-center"
        />
      </Label>
      <Label htmlFor="period">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="am">AM</SelectItem>
            <SelectItem value="pm">PM</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
};

export default TimePicker;
