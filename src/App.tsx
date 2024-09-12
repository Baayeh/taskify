import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "./components";

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
