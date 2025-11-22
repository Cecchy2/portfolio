import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ActiveSectionProvider } from "./context/ActiveSectionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ActiveSectionProvider>
    <App />
  </ActiveSectionProvider>
);
