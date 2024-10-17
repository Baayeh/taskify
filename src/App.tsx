import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "./components";
import { LoaderProvider } from "./context";

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </ThemeProvider>
  );
}

export default App;
