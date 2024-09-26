import NoTasksPreview from "../components/NoTasksPreview";

import TasksList from "../components/TaskList";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { selectTasks, setTasks } from "../redux/slices/taskSlice";
import { GET_ALL_TASKS } from "../services/tasks";
import { useLoader } from "@/hooks/useLoader";
import { useCallback, useEffect } from "react";

const AllTasks = () => {
  const { showLoader } = useLoader();
  const { tasks } = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  // get all tasks from services
  const getAllTasks = useCallback(async () => {
    showLoader(true);
    try {
      const data = await GET_ALL_TASKS();
      if (data) {
        dispatch(setTasks(data));
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      // Optionally, show an error message to the user
    } finally {
      showLoader(false);
    }
  }, [dispatch, showLoader]);

  useEffect(() => {
    void getAllTasks();
  }, []);

  return (
    <section className="w-full">
      {tasks.length === 0 ? <NoTasksPreview /> : <TasksList tasks={tasks} />}
    </section>
  );
};

export default AllTasks;
