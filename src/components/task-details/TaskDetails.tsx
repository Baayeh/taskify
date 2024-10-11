import { selectTasks, setTask } from "@/features/redux/slices/taskSlice";
import { Button } from "../ui/button";

import TaskCard from "@/features/components/TaskCard";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { Sun, Trash2, X } from "lucide-react";
import { DELETE_TASK, UPDATE_TASK } from "@/features/services/tasks";
import { useEffect, useMemo, useRef, useState } from "react";
import SelectDate from "../create-task/SelectDate";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  isToday,
  isYesterday,
} from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import AlertDialogComp from "../alert-dialog/AlertDialogComp";
import { useLoader } from "@/hooks/useLoader";
import { Task } from "@/types/tasks";
import useFetch from "@/hooks/useFetch";

const TaskDetails = () => {
  const { task } = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const { setShowDetails, isSmallScreen } = useScreenSize();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { showLoader } = useLoader();
  const { getAllTasks } = useFetch();

  // State management
  const [openReminder, setOpenReminder] = useState(false);
  const [openDueDate, setOpenDueDate] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [taskData, setTaskData] = useState({
    ...task,
    reminder: task.reminder ? new Date(task.reminder) : null,
    due_date: task.due_date ? new Date(task.due_date) : null,
  });

  const onSubmit = async (task: Task) => {
    if (!task) return;
    showLoader(true);
    try {
      const res = await UPDATE_TASK(task);
      if (res) {
        await getAllTasks();
        dispatch(setTask(res));
      }
    } catch (error) {
      console.log(error);
    } finally {
      showLoader(false);
    }
  };

  // Consolidated update function
  const handleTaskUpdate = (field: keyof Task, value: unknown) => {
    const updatedTask = { ...taskData, [field]: value };

    // Set the updated task in state
    setTaskData(updatedTask);

    // Submit updated task to the backend
    void onSubmit(updatedTask);
  };

  const timeDistanceHandler = (date: Date | null, created: boolean) => {
    if (!date) return "";

    const now = new Date();
    const label = created ? "Created" : "Updated";

    // If the date was yesterday
    if (isYesterday(date)) {
      return `${label} yesterday`;
    }

    // If the date is within a few minutes (less than 5 minutes ago)
    const minutesDifference = differenceInMinutes(now, date);
    if (minutesDifference < 5) {
      return `${label} few moments ago`;
    }

    // If the date is within 5 to 60 minutes
    if (minutesDifference < 60) {
      return `${label} ${minutesDifference} minutes ago`;
    }

    // If the date is within a few hours (less than 24 hours ago)
    const hoursDifference = differenceInHours(now, date);
    if (hoursDifference < 24 && isToday(date)) {
      return `${label} ${hoursDifference} hours ago`;
    }

    // If the date is 2 days or more ago, return the specific date format
    return `${label} on ${format(date, "EEE, dd MMM")}`;
  };

  const timeNoteUpdated = useMemo(
    () => timeDistanceHandler(task.note_updated, false),
    [task.note_updated]
  );

  const timeTaskCreated = useMemo(
    () => timeDistanceHandler(task.created, true),
    [task.created]
  );

  const deleteTaskHandler = async () => {
    showLoader(true);
    try {
      await DELETE_TASK(task.id);
      await getAllTasks();
      setOpenDeleteModal(false);
      setShowDetails(false);
    } catch (error) {
      console.log(error);
    } finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto to allow shrinking
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content's scrollHeight
    }
  }, [taskData.note]);

  useEffect(() => {
    if (taskData.reminder !== task.reminder) {
      handleTaskUpdate("reminder", taskData.reminder);
    }
  }, [taskData.reminder]);

  useEffect(() => {
    if (taskData.due_date !== task.due_date) {
      handleTaskUpdate("due_date", taskData.due_date);
    }
  }, [taskData.due_date]);

  return (
    <>
      {!isSmallScreen && (
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setShowDetails(false);
              dispatch(setTask({} as Task));
            }}
          >
            <X size={16} />
          </Button>
        </div>
      )}

      <ScrollArea
        className={`relative w-full h-[calc(100vh-9rem)] lg:h-[calc(100vh-10rem)] ${isSmallScreen ? "mt-6" : "mt-4"}`}
      >
        <div className="grid gap-y-4">
          <TaskCard task={taskData} />

          {taskData.my_day ? (
            <div className="w-full rounded h-12 bg-muted/50 flex justify-between items-center gap-x-4 pl-5 pr-3">
              <div className="flex items-center gap-x-3 text-primary">
                <Sun size={20} />
                <span className="text-base font-normal">Added to My Day</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleTaskUpdate("my_day", false)}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="w-full rounded h-12 bg-muted/50 justify-start items-center gap-x-4 pl-5 pr-3"
              onClick={() => handleTaskUpdate("my_day", true)}
            >
              <Sun size={20} />
              <span className="text-base font-normal">Add to My Day</span>
            </Button>
          )}

          <section className="bg-muted/50 rounded overflow-hidden">
            <div className="flex items-center">
              <SelectDate
                isReminder
                isDetails
                date={taskData.reminder ?? undefined}
                setDate={(newDate) => handleTaskUpdate("reminder", newDate)}
                open={openReminder}
                setOpen={setOpenReminder}
              />
              {taskData.reminder && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTaskUpdate("reminder", null)}
                  className="h-14 w-16 rounded-none bg-muted/50 hover:bg-muted"
                >
                  <X size={20} />
                </Button>
              )}
            </div>
            <Separator className="bg-gray-700/60" />
            <div className="flex items-center">
              <SelectDate
                isDetails
                isDueDate
                date={taskData.due_date ?? undefined}
                setDate={(newDate) => {
                  handleTaskUpdate("due_date", newDate);
                }}
                open={openDueDate}
                setOpen={setOpenDueDate}
              />
              {taskData.due_date && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTaskUpdate("due_date", null)}
                  className="h-14 w-16 rounded-none bg-muted/50 hover:bg-muted"
                >
                  <X size={20} />
                </Button>
              )}
            </div>
          </section>

          <div>
            <Label htmlFor="note" className="group bg-red-500">
              <Textarea
                ref={textareaRef}
                id="note"
                rows={2}
                value={taskData.note}
                onChange={(e) =>
                  setTaskData({ ...taskData, note: e.target.value })
                }
                placeholder="Add a note"
                onBlur={() => handleTaskUpdate("note", taskData.note)}
                className={`peer bg-muted/50 border-none rounded-t hover:bg-muted focus:bg-muted resize-none transition-all duration-300 ease-in-out ${task.note ? "rounded-b-none" : "rounded-b"}`}
              />
              {task.note && (
                <p className="rounded-b text-xs font-normal text-gray-300 bg-muted/50 peer-hover:bg-muted peer-focus:bg-muted transition-colors duration-300 ease-in-out pl-3 pb-3">
                  {timeNoteUpdated}
                </p>
              )}
            </Label>
          </div>
        </div>
      </ScrollArea>
      <div className="relative mt-7 lg:mt-5 flex items-center justify-center text-sm">
        <p>{timeTaskCreated}</p>
        <div className="absolute right-0">
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/20"
            onClick={() => setOpenDeleteModal(true)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      {openDeleteModal && (
        <AlertDialogComp
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your task."
          action={() => void deleteTaskHandler()}
        />
      )}
    </>
  );
};

export default TaskDetails;
