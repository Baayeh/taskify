import NoTasksPreview from "../components/NoTasksPreview";
import { useAppSelector } from "@/lib/utils";
import { selectTasks } from "../redux/slices/taskSlice";
import { useEffect } from "react";
import TasksList from "../components/TaskList";
import useFetch from "@/hooks/useFetch";

const MyDayTasks = () => {
  const { myDayTasks: tasks } = useAppSelector(selectTasks);
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

export default MyDayTasks;
