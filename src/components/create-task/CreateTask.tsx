import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Circle, Plus } from "lucide-react";
import AddDueDate from "./AddDueDate";
import { useState } from "react";
import { ADD_TASK } from "@/features/services/tasks";
import { useAppDispatch } from "@/lib/utils";
import { addTask } from "@/features/redux/slices/taskSlice";

interface CreateTaskProps {
  divRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  divRef,
  open,
  setOpen,
  title,
  setTitle,
}) => {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const dispatch = useAppDispatch();

  const createTask = async () => {
    if (!title) return;

    const task = {
      title,
    };

    try {
      const res = await ADD_TASK(task);

      if (res) {
        dispatch(addTask(res));
        setTitle("");

        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void createTask();
    }
  };

  return (
    <div ref={divRef} className="mt-5">
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
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <AddDueDate dueDate={dueDate} setDueDate={setDueDate} />
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
