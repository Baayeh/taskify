import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/tasks";
import { Bell, Calendar, Dot, File, RefreshCw, Star } from "lucide-react";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/utils";
import { UPDATE_TASK } from "../services/tasks";
import { updateTask } from "../redux/slices/taskSlice";

interface CardProps {
  task: Task;
}

const TaskCard: React.FC<CardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const markAsCompleted = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await UPDATE_TASK({ ...task, completed: !task.completed });

      if (res) dispatch(updateTask(res));
    } catch (error) {
      console.log(error);
    }
  };

  const markAsImportant = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await UPDATE_TASK({ ...task, important: !task.important });

      if (res) dispatch(updateTask(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="bg-muted/50 rounded-md hover:cursor-pointer hover:bg-muted transition-colors duration-300 ease-in-out"
      onClick={() => console.log("Card clicked")}
    >
      <CardContent className="h-[4rem] px-5 py-0 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Checkbox
            className="rounded-full w-5 h-5"
            onClick={(e) => void markAsCompleted(e)}
            checked={task.completed}
          />
          <div>
            <h3
              className={`${task.completed ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </h3>

            <div className="mt-1 text-xs text-muted-foreground flex items-center gap-x-3 sm:gap-x-1">
              <div className="flex items-center gap-x-2">
                {task.due_date && (
                  <p className="flex items-center gap-x-1">
                    <Calendar size={12} />
                    <span>{format(task.due_date, "EEE, dd MMM")}</span>
                  </p>
                )}

                {task.repeat && <RefreshCw size={12} />}
              </div>
              {(task.due_date || task.repeat) &&
              (task.reminder || task.note) ? (
                <Dot className="hidden sm:block" />
              ) : null}

              {task.reminder && (
                <>
                  <p className="flex items-center gap-x-1">
                    <Bell size={12} />
                    <span className="hidden sm:block">
                      {format(task.reminder, "EEE, dd MMM")}
                    </span>
                  </p>

                  <Dot className="hidden sm:block" />
                </>
              )}

              {task.note && (
                <div className="flex items-center gap-x-1">
                  {/* <Paperclip size={12} className="rotate-[135deg]" /> */}
                  <File size={12} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => void markAsImportant(e)}
            className="hover:text-primary"
          >
            <Star
              size={20}
              fill={task.important ? "#6d28d9" : "none"}
              stroke={task.important ? "#6d28d9" : "currentColor"}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
