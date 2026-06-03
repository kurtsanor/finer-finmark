import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { TOASTER_DEFAULT_OPTIONS } from "./constants/Toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-right" toastOptions={TOASTER_DEFAULT_OPTIONS} />
    <App />
  </StrictMode>,
);
