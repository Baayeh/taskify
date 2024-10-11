import { useAppSelector } from "@/lib/utils";
import { selectTasks } from "../redux/slices/taskSlice";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import NoTasksPreview from "../components/NoTasksPreview";
import TasksList from "../components/TaskList";

const ImportantTasks = () => {
  const { importantTasks: tasks } = useAppSelector(selectTasks);
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

export default ImportantTasks;
