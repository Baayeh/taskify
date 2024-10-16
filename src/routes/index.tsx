import { tasksRoutes } from "@/features";
import { DashboardLayout, RootLayout } from "../layouts";
import { Navigate } from "react-router-dom";
import Login from "@/features/pages/auth/Login";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
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
