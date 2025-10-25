import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DeviceProvider } from "./context/DeviceContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </BrowserRouter>
  </StrictMode>
);
