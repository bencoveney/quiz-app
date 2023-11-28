import { App } from "./components/app";
import { createRoot } from "react-dom/client";
import "./index.module.css";

window.addEventListener("load", () => {
  const rootElement = document.getElementById("root")!;
  const root = createRoot(rootElement);
  root.render(<App />);
});
