import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "../components/TaskCard";
import { Task } from "@/types/tasks";

interface Props {
  tasks: Task[];
}

const TasksList: React.FC<Props> = ({ tasks }) => {
  return (
    <ScrollArea className="relative w-full h-[calc(100vh-15rem)] md:h-[calc(100vh-12rem)]">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ScrollArea>
  );
};

export default TasksList;
