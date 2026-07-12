import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@baseui.sh/react/styles.css";
import "./showcase.css";
import { App } from "./App.js";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing #root element");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
