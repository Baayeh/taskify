import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SelectDate from "./SelectDate";

interface AddDueDateProps {
  dueDate: Date | undefined;
  setDueDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const AddDueDate: React.FC<AddDueDateProps> = ({ dueDate, setDueDate }) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SelectDate
            date={dueDate}
            setDate={setDueDate}
            open={open}
            setOpen={setOpen}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-muted shadow-md shadow-black/50">
          Add due date
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddDueDate;
