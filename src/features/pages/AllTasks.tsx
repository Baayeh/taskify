import NoTasksPreview from "../components/NoTasksPreview";

import TasksList from "./TaskList";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { selectTasks, setTasks } from "../redux/slices/taskSlice";
import { GET_ALL_TASKS } from "../services/tasks";
import { useLoader } from "@/hooks/useLoader";
import { useEffect } from "react";

const AllTasks = () => {
  const { showLoader } = useLoader();
  const { tasks } = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  // get all tasks from services
  const getAllTasks = async () => {
    showLoader(true);

    try {
      const data = await GET_ALL_TASKS();

      if (data) {
        dispatch(setTasks(data));
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      showLoader(false);
    }
  };

  useEffect(() => {
    void getAllTasks();
  }, []);

  return (
    <>
      <section className="w-full">
        {tasks.length === 0 && <NoTasksPreview />}

        {tasks.length ? <TasksList tasks={tasks} /> : null}
      </section>
    </>
  );
};

export default AllTasks;
