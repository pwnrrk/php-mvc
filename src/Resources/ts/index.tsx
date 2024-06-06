import "../css/index.css";
import React from "react";
import { createRoot } from "react-dom/client";

(window as any).render = function (page: string, props: any) {
  const root = createRoot(document.getElementById("app") as HTMLElement);
  const Page = require(`./Pages/${page}`).default;
  root.render(<Page {...props} />);
};
