import "../css/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/layout/Layout";

const page = (window as any)._react_page;
const props = (window as any)._react_props;

const Page = React.lazy(() => import(`./Pages/${page}`));

let Loader = undefined;
try {
  Loader = require(`./Pages/${page}.loading`)?.default;
} catch {}

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <Layout>
    <React.Suspense fallback={Loader ? <Loader /> : <></>}>
      <Page {...props} />
    </React.Suspense>
  </Layout>
);

document.getElementById("react-value")?.remove();
