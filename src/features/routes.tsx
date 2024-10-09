import { AllTasks, MyDayTasks } from ".";

const tasksRoutes = [
  {
    index: true,
    element: <AllTasks />,
  },
  {
    path: "my-day",
    element: <MyDayTasks />,
  },
];

export default tasksRoutes;
