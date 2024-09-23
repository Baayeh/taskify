import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Circle, Plus } from "lucide-react";

interface CreateTaskProps {
  divRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  divRef,
  open,
  setOpen,
  task,
  setTask,
}) => {
  return (
    <div ref={divRef} className="mt-5">
      {open ? (
        <Label htmlFor="create-task" className="relative">
          <Input
            id="create-task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
            placeholder="Try typing 'Pay utilities bill by Saturday 6pm'"
            className="h-14 bg-muted pl-12 placeholder:text-primary focus-visible:ring-0"
          />
          <Circle className="absolute top-1/2 -translate-y-1/2 left-4 text-primary" />
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
