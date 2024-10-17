import { tasksRoutes } from "@/features";
import { DashboardLayout, RootLayout } from "../layouts";
import { Navigate } from "react-router-dom";
import Authentication from "@/layouts/Authentication";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" />,
      },
      {
        path: "/auth",
        element: <Authentication />,
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
