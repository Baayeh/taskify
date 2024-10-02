import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/tasks";
import { Bell, Calendar, Dot, File, RefreshCw, Star } from "lucide-react";
import { displayDate, useAppDispatch } from "@/lib/utils";
import { UPDATE_TASK } from "../services/tasks";
import { setTask, updateTask } from "../redux/slices/taskSlice";
import { useScreenSize } from "@/hooks/useScreenSize";
import { isPast } from "date-fns";

interface CardProps {
  task: Task;
  showDetails?: boolean;
}

const TaskCard: React.FC<CardProps> = ({ task, showDetails }) => {
  const dispatch = useAppDispatch();
  const { setShowDetails } = useScreenSize();

  const markAsCompleted = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await UPDATE_TASK({ ...task, completed: !task.completed });

      if (res) {
        dispatch(updateTask(res));
        if (showDetails) dispatch(setTask(res));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAsImportant = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await UPDATE_TASK({ ...task, important: !task.important });

      if (res) {
        dispatch(updateTask(res));
        if (showDetails) dispatch(setTask(res));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectTask = () => {
    dispatch(setTask(task));
    setShowDetails(true);
  };

  return (
    <Card
      className={`${showDetails ? "rounded bg-muted/50 border-0" : "bg-muted/50 rounded-md hover:cursor-pointer hover:bg-muted transition-colors duration-300 ease-in-out"}`}
      onClick={() => !showDetails && selectTask()}
    >
      <CardContent
        className={`pl-5 pr-3 py-0 flex justify-between items-center ${showDetails ? "min-h-[4rem] max-h-[5rem]" : "h-[4rem]"}`}
      >
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

            {!showDetails && (
              <div className="mt-1 text-xs text-muted-foreground flex items-center gap-x-3 sm:gap-x-1">
                <div className="flex items-center gap-x-2">
                  {task.due_date && (
                    <p
                      className={`flex items-center gap-x-1 ${isPast(task.due_date) ? "text-red-500" : ""}`}
                    >
                      <Calendar size={12} />
                      <span>{displayDate(task.due_date)}</span>
                    </p>
                  )}

                  {task.repeat && <RefreshCw size={12} />}
                </div>
                {(task.due_date || task.repeat) &&
                ((task.reminder && !isPast(task.reminder)) || task.note) ? (
                  <Dot className="hidden sm:block" />
                ) : null}

                {task.reminder && !isPast(task.reminder) && (
                  <>
                    <p className="flex items-center gap-x-1">
                      <Bell size={12} />
                      <span className="hidden sm:block">
                        {displayDate(task.reminder)}
                      </span>
                    </p>
                  </>
                )}

                {(task.due_date || task.repeat) &&
                ((task.reminder && !isPast(task.reminder)) || task.note) ? (
                  <Dot className="hidden sm:block" />
                ) : null}

                {task.note && (
                  <div className="flex items-center gap-x-1">
                    {/* <Paperclip size={12} className="rotate-[135deg]" /> */}
                    <File size={12} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => void markAsImportant(e)}
            className="hover:text-primary hover:bg-transparent"
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
