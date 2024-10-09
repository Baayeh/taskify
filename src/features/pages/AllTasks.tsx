import NoTasksPreview from "../components/NoTasksPreview";

import TasksList from "../components/TaskList";
import { selectTasks } from "../redux/slices/taskSlice";
import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useAppSelector } from "@/lib/utils";

const AllTasks = () => {
  const { tasks } = useAppSelector(selectTasks);
  const { getAllTasks } = useFetch();

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
