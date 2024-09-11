import { DashboardLayout, RootLayout } from "../layouts";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
    ],
  },
];

export default routes;
