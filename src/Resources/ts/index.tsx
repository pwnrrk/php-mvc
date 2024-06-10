import "../css/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/layout/Layout";

(window as any).render = function (page: string, props: any) {
  const root = createRoot(document.getElementById("app") as HTMLElement);
  const Page = React.lazy(() => import(`./Pages/${page}`));
  root.render(
    <Layout>
      <React.Suspense fallback={<></>}>
        <Page {...props} />
      </React.Suspense>
    </Layout>
  );
  document.getElementById("react-renderer")?.remove();
};
