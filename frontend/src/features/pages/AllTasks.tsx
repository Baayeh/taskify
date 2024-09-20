import { Task } from "@/types/tasks";
import NoTasksPreview from "../components/NoTasksPreview";

import TasksList from "./TaskList";

const AllTasks = () => {
  const tasks: Task[] = [];

  return (
    <>
      <section className="w-full">
        {tasks.length === 0 && <NoTasksPreview />}

        {
          // TODO: Add a task card for each task
        }
        {tasks.length ? <TasksList tasks={tasks} /> : null}
      </section>
    </>
  );
};

export default AllTasks;
