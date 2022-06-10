import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./app.js";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
