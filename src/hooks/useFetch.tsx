import {
  setImportantTasks,
  setMyDayTasks,
  setPlannedTasks,
  setTasks,
} from "@/features/redux/slices/taskSlice";
import { GET_ALL_TASKS } from "@/features/services/tasks";
import { useAppDispatch } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { useLoader } from "./useLoader";
import { useLocation } from "react-router-dom";

const useFetch = () => {
  const dispatch = useAppDispatch();
  const { showLoader } = useLoader();
  const { pathname } = useLocation();

  const isPathnameDefault = useMemo(() => pathname === "/tasks", [pathname]);
  const isPathnameMyDay = useMemo(
    () => pathname === "/tasks/my-day",
    [pathname]
  );
  const isPathnameImportant = useMemo(
    () => pathname === "/tasks/important",
    [pathname]
  );
  const isPathnamePlanned = useMemo(
    () => pathname === "/tasks/planned",
    [pathname]
  );

  // get all tasks from services
  const getAllTasks = useCallback(async () => {
    showLoader(true);
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
      showLoader(false);
    }
  }, [dispatch, showLoader]);

  return {
    getAllTasks,
    isPathnameDefault,
    isPathnameMyDay,
    isPathnameImportant,
    isPathnamePlanned,
  };
};

export default useFetch;
