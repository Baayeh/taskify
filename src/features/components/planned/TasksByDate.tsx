import { Task } from "@/types/tasks";
import groupTasksByDate from "./groupTasksByDate";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRightIcon } from "lucide-react";
import TaskCard from "../TaskCard";
import { useEffect, useRef, useState } from "react";
import TaskContextMenu from "../TaskContextMenu";

interface Props {
  tasks: Task[];
}

const TasksByDate: React.FC<Props> = ({ tasks }) => {
  const {
    today: todayTasks,
    tomorrow: tomorrowTasks,
    nextWeek: nextWeekTasks,
    later: laterTasks,
  } = groupTasksByDate(tasks);

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState({
    position: { x: 0, y: 0 },
    toggle: false,
  });
  const [rightClickedTask, setRightClickedTask] = useState<Task>({} as Task);

  // handle context menu
  const handleOnContextMenu = (e: React.MouseEvent, item: Task) => {
    e.preventDefault(); // Prevent the default right-click menu

    const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();

    const isLeft = e.clientX < window.innerWidth / 2;

    let x;
    const y = e.clientY;

    if (isLeft) {
      x = e.clientX;
    } else {
      x = e.clientX - contextMenuAttr!.width;
    }

    setContextMenu({
      position: { x, y },
      toggle: true,
    });

    setRightClickedTask(item);
  };

  const resetContextMenu = () => {
    setContextMenu({
      position: { x: 0, y: 0 },
      toggle: false,
    });
    setRightClickedTask({} as Task);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!contextMenuRef.current?.contains(e.target as Node)) {
        resetContextMenu();
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      <ScrollArea className="relative w-full h-[calc(100vh-18rem)] md:h-[calc(100vh-15rem)]">
        {todayTasks.length > 0 && (
          <div className="mb-3">
            <Accordion type="single" collapsible defaultValue="today">
              <AccordionItem value="today" className="accordion border-b-0">
                <AccordionTrigger className="trigger-btn mb-2 border px-3 py-2 w-fit inline-flex flex-none justify-start gap-x-5 rounded-md hover:no-underline hover:border-primary">
                  <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  <span>Today</span>
                  <span>{todayTasks.length}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col gap-y-2">
                    {todayTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isFromTaskList
                        onContextMenu={(event) =>
                          handleOnContextMenu(event, task)
                        }
                        resetContextMenu={resetContextMenu}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {tomorrowTasks.length > 0 && (
          <div className="mb-3">
            <Accordion type="single" collapsible defaultValue="tomorrow">
              <AccordionItem value="tomorrow" className="accordion border-b-0">
                <AccordionTrigger className="trigger-btn mb-2 border px-3 py-2 w-fit inline-flex flex-none justify-start gap-x-5 rounded-md hover:no-underline hover:border-primary">
                  <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  <span>Tomorrow</span>
                  <span>{tomorrowTasks.length}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col gap-y-2">
                    {tomorrowTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isFromTaskList
                        onContextMenu={(event) =>
                          handleOnContextMenu(event, task)
                        }
                        resetContextMenu={resetContextMenu}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {nextWeekTasks.length > 0 && (
          <div className={`${laterTasks.length > 0 ? "mb-3" : "mb-0"}`}>
            <Accordion type="single" collapsible defaultValue="next_week">
              <AccordionItem value="next_week" className="accordion border-b-0">
                <AccordionTrigger className="trigger-btn mb-2 border px-3 py-2 w-fit inline-flex flex-none justify-start gap-x-5 rounded-md hover:no-underline hover:border-primary">
                  <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  <span>Next week</span>
                  <span>{nextWeekTasks.length}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col gap-y-2">
                    {nextWeekTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isFromTaskList
                        onContextMenu={(event) =>
                          handleOnContextMenu(event, task)
                        }
                        resetContextMenu={resetContextMenu}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {laterTasks.length > 0 && (
          <div>
            <Accordion type="single" collapsible defaultValue="later">
              <AccordionItem value="later" className="accordion border-b-0">
                <AccordionTrigger className="trigger-btn mb-2 border px-3 py-2 w-fit inline-flex flex-none justify-start gap-x-5 rounded-md hover:no-underline hover:border-primary">
                  <ChevronRightIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  <span>Later</span>
                  <span>{laterTasks.length}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col gap-y-2">
                    {laterTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isFromTaskList
                        onContextMenu={(event) =>
                          handleOnContextMenu(event, task)
                        }
                        resetContextMenu={resetContextMenu}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </ScrollArea>

      <TaskContextMenu
        contextMenuRef={contextMenuRef}
        isToggled={contextMenu.toggle}
        rightClickedTask={rightClickedTask}
        positionY={contextMenu.position.y}
        positionX={contextMenu.position.x}
        resetContextMenu={resetContextMenu}
      />
    </>
  );
};

export default TasksByDate;
