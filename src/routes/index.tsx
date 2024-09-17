import { tasksRoutes } from "@/features";
import { DashboardLayout, RootLayout } from "../layouts";
import { Navigate } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/tasks" />,
      },
      {
        path: "/tasks",
        element: <DashboardLayout />,
        children: [...tasksRoutes],
      },
    ],
  },
];

export default routes;
