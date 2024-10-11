import { Task } from "@/types/tasks";
import { isToday, isTomorrow, addDays } from "date-fns";

interface GroupedTasks {
  today: Task[];
  tomorrow: Task[];
  nextWeek: Task[];
  later: Task[];
}

function groupTasksByDate(tasks: Task[]): GroupedTasks {
  const today: Task[] = [];
  const tomorrow: Task[] = [];
  const nextWeek: Task[] = [];
  const later: Task[] = [];

  const now = new Date();
  const startOfNextWeek = addDays(now, 7);

  tasks.forEach((task) => {
    const dateToUse = task.due_date ?? task.reminder; // Use due_date primarily, or reminder if due_date is null
    console.log(new Date(dateToUse!) < startOfNextWeek);
    console.log("dateToUse", dateToUse, new Date(dateToUse!));
    console.log("startOfNextWeek", startOfNextWeek);

    if (dateToUse) {
      if (isToday(dateToUse)) {
        today.push(task);
      } else if (isTomorrow(dateToUse)) {
        tomorrow.push(task);
      } else if (new Date(dateToUse) < startOfNextWeek) {
        nextWeek.push(task);
      } else {
        later.push(task);
      }
    } else {
      // If both due_date and reminder are null, consider the task as "later"
      return;
    }
  });

  return { today, tomorrow, nextWeek, later };
}

export default groupTasksByDate;
