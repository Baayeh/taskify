import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from "./TaskCard";
import { Task } from "@/types/tasks";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  tasks: Task[];
}

const TasksList: React.FC<Props> = ({ tasks }) => {
  const { pathname } = useLocation();

  // uncompleted tasks
  const uncompletedTasks = tasks?.filter((task: Task) => !task.completed);

  // get completed tasks based on the pathname
  const getCompletedTask = useCallback(() => {
    switch (pathname) {
      case "/tasks/my_day":
        return tasks.filter((task) => task.my_day && task.completed);
      case "/tasks/important":
        return tasks.filter((task) => task.important && task.completed);
      case "/tasks/planned":
        return tasks.filter(
          (task) =>
            (task.due_date != null || task.reminder != null) && task.completed
        );
      default:
        return tasks.filter((task) => task.completed);
    }
  }, [tasks, pathname]);

  const completedTasks = getCompletedTask();

  return (
    <ScrollArea className="relative w-full h-[calc(100vh-15rem)] md:h-[calc(100vh-12rem)]">
      {uncompletedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      {completedTasks ? (
        <Accordion type="single" collapsible defaultValue="completed">
          <AccordionItem value="completed" className="accordion">
            <AccordionTrigger className="hover:no-underline">
              <Button variant="outline" className="trigger-btn gap-x-4">
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                <span>Completed</span>
                <span>{completedTasks.length}</span>
              </Button>
            </AccordionTrigger>
            <AccordionContent>
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </ScrollArea>
  );
};

export default TasksList;
