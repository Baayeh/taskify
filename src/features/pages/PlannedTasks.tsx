import { useAppSelector } from "@/lib/utils";
import { selectTasks } from "../redux/slices/taskSlice";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import NoTasksPreview from "../components/NoTasksPreview";
import TasksByDate from "../components/planned/TasksByDate";

const PlannedTasks = () => {
  const { plannedTasks: tasks } = useAppSelector(selectTasks);
  const { getAllTasks } = useFetch();

  //

  useEffect(() => {
    void getAllTasks();
  }, []);

  return (
    <section>
      {tasks.length === 0 ? <NoTasksPreview /> : <TasksByDate tasks={tasks} />}
    </section>
  );
};

export default PlannedTasks;
