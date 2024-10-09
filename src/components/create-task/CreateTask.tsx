import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Circle, Plus } from "lucide-react";
import AddDueDate from "./AddDueDate";
import { useEffect, useState } from "react";
import { ADD_TASK } from "@/features/services/tasks";
import { parseTimeAndSet } from "@/lib/utils";
import AddReminder from "./AddReminder";
import { addDays, Day, nextDay, parse } from "date-fns";
import { useLoader } from "@/hooks/useLoader";
import useFetch from "@/hooks/useFetch";
import useCheckPathname from "@/hooks/useCheckPathname";

interface CreateTaskProps {
  divRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

// Regex pattern for detecting the day of the week
const dayOfWeekRegex =
  /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i;

// Regex pattern for detecting the time
export const timeRegex = /(\d{1,2})(?::(\d{2}))?\s?(am|pm)?/i;

const CreateTask: React.FC<CreateTaskProps> = ({
  divRef,
  open,
  setOpen,
  title,
  setTitle,
}) => {
  const { showLoader } = useLoader();
  const { getAllTasks } = useFetch();
  const { isPathnameMyDay, isPathnameImportant, isPathnamePlanned } =
    useCheckPathname();

  // Create task states
  const [dueDate, setDueDate] = useState<Date | undefined>(
    isPathnamePlanned ? new Date() : undefined
  );
  const [reminder, setReminder] = useState<Date | undefined>();

  const createTask = async () => {
    if (!title) return;

    showLoader(true);

    const task = {
      title,
      due_date: dueDate ?? null,
      reminder: reminder ?? null,
      my_day: isPathnameMyDay,
      important: isPathnameImportant,
    };

    try {
      const res = await ADD_TASK(task);

      if (res) {
        await getAllTasks();

        // Reset fields after task creation
        setTitle("");
        setDueDate(undefined);
        setReminder(undefined);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      showLoader(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void createTask();
    }
  };

  const lowercaseTitle = title.toLowerCase();
  const dayMatch = dayOfWeekRegex.exec(lowercaseTitle);
  const timeMatch = timeRegex.exec(lowercaseTitle);

  useEffect(() => {
    if (!title) return;

    const now = new Date();

    if (dayMatch) {
      const day = dayMatch[0];
      const dayIndex = parse(day, "EEEE", new Date()).getDay();
      const nextDayDate = nextDay(now, dayIndex as Day);

      const dueDateWithTime = parseTimeAndSet(nextDayDate, timeMatch); // Add time if available
      setReminder(timeMatch ? dueDateWithTime : undefined); // Set reminder if time is provided
      setDueDate(timeMatch ? undefined : nextDayDate); // Set due date if no time is provided
    }

    if (lowercaseTitle.includes("today")) {
      const todayWithTime = parseTimeAndSet(now, timeMatch); // Add time if available
      setReminder(timeMatch ? todayWithTime : undefined); // Set reminder if time is provided
      setDueDate(timeMatch ? undefined : now); // Set due date if no time is provided
    }

    if (lowercaseTitle.includes("tomorrow")) {
      const tomorrow = addDays(now, 1);
      const tomorrowWithTime = parseTimeAndSet(tomorrow, timeMatch); // Add time if available
      setReminder(timeMatch ? tomorrowWithTime : undefined); // Set reminder if time is provided
      setDueDate(timeMatch ? undefined : tomorrow); // Set due date if no time is provided
    }
  }, [title, parseTimeAndSet]);

  return (
    <div ref={divRef} className="mt-10">
      {open ? (
        <Label htmlFor="create-task" className="relative">
          <Circle className="absolute top-1/2 -translate-y-1/2 left-4 text-primary" />
          <Input
            id="create-task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Try typing 'Pay utilities bill by Saturday 6pm'"
            className="h-14 bg-muted pl-12 placeholder:text-primary focus-visible:ring-0"
          />
          {title && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-x-1">
              <AddDueDate dueDate={dueDate} setDueDate={setDueDate} />
              <AddReminder reminder={reminder} setReminder={setReminder} />
            </div>
          )}
        </Label>
      ) : (
        <div
          className="p-4 text-sm rounded flex items-center gap-x-3 text-primary bg-muted/50 hover:cursor-text hover:bg-muted transition-colors duration-300 ease-in-out"
          onClick={() => setOpen(true)}
        >
          <Plus />
          <p>Add Task </p>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
