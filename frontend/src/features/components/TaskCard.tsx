import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/tasks";
import {
  Bell,
  Calendar,
  Dot,
  File,
  Paperclip,
  RefreshCw,
  Star,
} from "lucide-react";
import { useState } from "react";

interface CardProps {
  task: Task;
}

const TaskCard: React.FC<CardProps> = ({ task }) => {
  const [checked, setChecked] = useState(false);
  const [important, setImportant] = useState(false);

  const markAsCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChecked(!checked);
  };

  const markAsImportant = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImportant(!important);
  };

  console.log("checked: ", checked);
  console.log("important: ", important);

  return (
    <Card
      className="bg-muted/50 rounded-md hover:cursor-pointer hover:bg-muted transition-colors duration-300 ease-in-out"
      onClick={() => console.log("Card clicked")}
    >
      <CardContent className="px-5 py-3 flex justify-between">
        <div className="flex items-center gap-x-3">
          <Checkbox
            className="rounded-full w-5 h-5"
            onClick={markAsCompleted}
            checked={checked}
          />
          <div>
            <h3
              className={`${checked ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title || "Pay utilities bill by Saturday 6pm"}
            </h3>

            <div className="mt-1 text-xs text-muted-foreground flex items-center gap-x-3 sm:gap-x-1">
              <div className="flex items-center gap-x-2">
                <p className="flex items-center gap-x-1">
                  <Calendar size={12} />
                  <span>Sat, 21 Sep</span>
                </p>

                <RefreshCw size={12} />
              </div>
              <Dot className="hidden sm:block" />
              <p className="flex items-center gap-x-1">
                <Bell size={12} />
                <span className="hidden sm:block">Wed, 18 Sep</span>
              </p>
              <Dot className="hidden sm:block" />
              <div className="flex items-center gap-x-1">
                <Paperclip size={12} className="rotate-[135deg]" />
                <File size={12} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            size="icon"
            variant="ghost"
            onClick={markAsImportant}
            className="hover:text-primary"
          >
            <Star
              size={20}
              fill={important ? "#6d28d9" : "none"}
              stroke={important ? "#6d28d9" : "currentColor"}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
