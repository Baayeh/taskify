import { AllTasks, MyDayTasks } from ".";
import ImportantTasks from "./pages/ImportantTasks";
import PlannedTasks from "./pages/PlannedTasks";

const tasksRoutes = [
  {
    index: true,
    element: <AllTasks />,
  },
  {
    path: "my-day",
    element: <MyDayTasks />,
  },
  {
    path: "important",
    element: <ImportantTasks />,
  },
  {
    path: "planned",
    element: <PlannedTasks />,
  },
];

export default tasksRoutes;
