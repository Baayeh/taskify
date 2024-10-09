import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useDateInfo from "@/hooks/useDateInfo";
import { formatDate } from "@/lib/utils";
import { Task } from "@/types/tasks";
import {
  CalendarArrowDown,
  CalendarCheck,
  CircleCheck,
  Star,
  Sun,
  Trash2,
} from "lucide-react";

interface Props {
  task: Task | null;
  onTaskUpdate: (field: keyof Task, value: unknown) => Promise<void>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isSpacer?: boolean;
}

const TaskContextMenuButtons: React.FC<Props> = ({
  task,
  onTaskUpdate,
  setOpenDeleteModal,
}) => {
  const { today, tomorrow } = useDateInfo();

  const buttons: ButtonProps[] = [
    {
      label: task?.my_day ? "Remove from My Day" : "Add to My Day",
      icon: <Sun size={18} />,
      onClick: () => void onTaskUpdate("my_day", !task?.my_day),
    },
    {
      label: task?.important ? "Remove importance" : "Add to Important",
      icon: <Star size={18} />,
      onClick: () => void onTaskUpdate("important", !task?.important),
    },
    {
      label: task?.completed ? "Mark as not completed" : "Mark as completed",
      icon: <CircleCheck size={18} />,
      onClick: () => void onTaskUpdate("completed", !task?.completed),
      isSpacer: true,
    },
    ...(!task?.due_date ||
    (task?.due_date && formatDate(task.due_date) !== formatDate(today))
      ? [
          {
            label: "Due today",
            icon: <CalendarCheck size={16} />,
            onClick: () => void onTaskUpdate("due_date", today),
          },
        ]
      : []),
    ...(!task?.due_date ||
    (task?.due_date && formatDate(task.due_date) !== formatDate(tomorrow))
      ? [
          {
            label: "Due tomorrow",
            icon: <CalendarArrowDown size={16} />,
            onClick: () => void onTaskUpdate("due_date", tomorrow),
          },
        ]
      : []),
    ...(task?.due_date
      ? [
          {
            label: "Remove due date",
            icon: <CalendarCheck size={16} />,
            onClick: () => void onTaskUpdate("due_date", null),
          },
        ]
      : []),
  ];

  return (
    <div>
      {buttons.map((button, index) => {
        const handleClick = (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.stopPropagation();

          button.onClick();
        };

        if (button.isSpacer) return <Separator key={index} className="my-1" />;

        return (
          <Button
            key={button.label}
            variant="ghost"
            onClick={(e) => handleClick(e)}
            className="w-full relative flex cursor-pointer select-none justify-start items-center gap-x-6 rounded-sm px-2 py-6 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <span className="text-gray-500">{button.icon}</span>
            <span className="font-normal">{button.label}</span>
          </Button>
        );
      })}
      <Separator className="my-1" />
      <Button
        variant="ghost"
        className="w-full relative flex cursor-pointer select-none justify-start items-center gap-x-6 rounded-sm px-2 py-6 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500 hover:text-red-500"
        onClick={() => setOpenDeleteModal(true)}
      >
        <span>
          <Trash2 size={16} />
        </span>
        <span>Delete task</span>
      </Button>
    </div>
  );
};

export default TaskContextMenuButtons;
