import "../css/index.css";
import { createRoot } from "react-dom/client";
import Layout from "./components/layout/Layout";

const page = (window as any)._react_page;
const props = (window as any)._react_props;

const root = createRoot(document.getElementById("app") as HTMLElement);
import(`./Pages/${page}`).then((Page) => {
  root.render(
    <Layout>
      <Page.default {...props} />
    </Layout>,
  );
  document.getElementById("react-value")?.remove();
});
