import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "@/features/redux/store.ts";
import { ScreenSizeProvider } from "@/context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ScreenSizeProvider>
        <App />
      </ScreenSizeProvider>
    </Provider>
  </StrictMode>
);
