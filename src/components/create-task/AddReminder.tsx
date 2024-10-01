import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useState } from "react";
import SelectDate from "./SelectDate";

interface AddReminderProps {
  reminder: Date | undefined;
  setReminder: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const AddReminder: React.FC<AddReminderProps> = ({ reminder, setReminder }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <SelectDate
              isReminder
              date={reminder}
              setDate={setReminder}
              open={open}
              setOpen={setOpen}
            />
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
