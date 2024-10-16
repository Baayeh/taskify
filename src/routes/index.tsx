import { tasksRoutes } from "@/features";
import { DashboardLayout, RootLayout } from "../layouts";
import { Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";

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
        element: <AuthLayout />,
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
