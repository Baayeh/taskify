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
import { useMemo } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface Props {
  tasks: Task[];
}

const TasksList: React.FC<Props> = ({ tasks }) => {
  const { pathname } = useLocation();

  // uncompleted tasks
  const uncompletedTasks = useMemo(
    () => tasks?.filter((task: Task) => !task.completed),
    [tasks]
  );

  // completed tasks based on the pathname
  const completedTasks = useMemo(() => {
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

  const sortArray = (a: Task, b: Task) => {
    const dateA = new Date(a.updated);
    const dateB = new Date(b.updated);
    return dateB.getTime() - dateA.getTime(); // Sorting by most recent);
  };

  // get important tasks
  const importantTasks = uncompletedTasks
    ?.filter((task: Task) => task.important)
    .sort(sortArray);

  const unimportantTasks = uncompletedTasks?.filter(
    (task: Task) => !task.important
  );

  const allTasks = [...importantTasks, ...unimportantTasks];

  return (
    <ScrollArea className="relative w-full h-[calc(100vh-13rem)] md:h-[calc(100vh-12rem)] pr-5 md:pr-14">
      <div className="flex flex-col gap-y-2">
        {allTasks.map((task) => (
          <TaskCard key={task.id} task={task} isFromTaskList />
        ))}
      </div>

      {completedTasks.length ? (
        <div className="mt-3">
          <Accordion type="single" collapsible defaultValue="completed">
            <AccordionItem value="completed" className="accordion border-b-0">
              <AccordionTrigger className="trigger-btn mb-2 border px-3 py-2 w-fit inline-flex flex-none justify-start gap-x-5 rounded-md hover:no-underline hover:border-primary">
                <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                <span>Completed</span>
                <span>{completedTasks.length}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="flex flex-col gap-y-2">
                  {completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} isFromTaskList />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null}
    </ScrollArea>
  );
};

export default TasksList;
