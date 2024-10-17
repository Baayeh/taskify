import {
  setImportantTasks,
  setMyDayTasks,
  setPlannedTasks,
  setTasks,
} from "@/features/redux/slices/taskSlice";
import { GET_ALL_TASKS } from "@/features/services/tasks";
import { useAppDispatch } from "@/lib/utils";
import { useCallback } from "react";
import { useLoader } from "./useLoader";

const useFetch = () => {
  const dispatch = useAppDispatch();
  const { setLoading } = useLoader();

  // get all tasks from services
  const getAllTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GET_ALL_TASKS();
      if (data) {
        dispatch(setTasks(data));
        dispatch(setMyDayTasks(data.filter((task) => task.my_day)));
        dispatch(setImportantTasks(data.filter((task) => task.important)));
        dispatch(
          setPlannedTasks(data.filter((task) => task.due_date ?? task.reminder))
        );
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  }, [dispatch, setLoading]);

  return {
    getAllTasks,
  };
};

export default useFetch;
