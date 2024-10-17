import { Task } from "@/types/tasks";
import TaskContextMenuButtons from "./TaskContextMenuButtons";
import { useLoader } from "@/hooks/useLoader";
import { DELETE_TASK, UPDATE_TASK } from "../services/tasks";
import { useAppDispatch } from "@/lib/utils";
import { setTask } from "../redux/slices/taskSlice";
import { useState } from "react";
import AlertDialogComp from "@/components/alert-dialog/AlertDialogComp";
import useFetch from "@/hooks/useFetch";

interface Props {
  rightClickedTask: Task;
  positionX: number;
  positionY: number;
  isToggled: boolean;
  contextMenuRef: React.RefObject<HTMLDivElement>;
  resetContextMenu: () => void;
}

const TaskContextMenu: React.FC<Props> = ({
  rightClickedTask: task,
  positionY,
  positionX,
  contextMenuRef,
  isToggled,
  resetContextMenu,
}) => {
  const { setLoading } = useLoader();
  const dispatch = useAppDispatch();
  const { getAllTasks } = useFetch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleTaskUpdate = async (field: keyof Task, value: unknown) => {
    if (!task) return;
    setLoading(true);

    try {
      const updatedTask = { ...task, [field]: value };
      const res = await UPDATE_TASK(updatedTask);

      if (res) {
        await getAllTasks();
        dispatch(setTask(res));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      resetContextMenu();
    }
  };

  const deleteTaskHandler = async () => {
    setLoading(true);
    try {
      await DELETE_TASK(task.id);
      await getAllTasks();
      setOpenDeleteModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      resetContextMenu();
    }
  };

  return (
    <>
      <menu
        ref={contextMenuRef}
        style={{
          position: "absolute",
          top: positionY + 2 + "px",
          left: positionX + 2 + "px",
        }}
        className={`invisible opacity-0 fixed z-50 p-1 w-full max-w-[22rem] rounded-md border bg-popover data-[state=open]:visible data-[state=open]:opacity-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${isToggled ? "active" : ""}`}
        data-state={isToggled ? "open" : "closed"}
      >
        <TaskContextMenuButtons
          task={task}
          onTaskUpdate={handleTaskUpdate}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      </menu>

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

export default TaskContextMenu;
