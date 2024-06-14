import { Suspense, lazy } from "react";
import { BASE_URL } from "../constant";

interface DocsProps {
  name: string;
}

interface DocLinks {
  name: string;
  href: string;
}

export default function Docs({ name }: DocsProps) {
  const Content = lazy(() => import(`../components/docs/${name}`));

  const getStartLinks: DocLinks[] = [
    {
      name: "Installation",
      href: "/installation",
    },
    {
      name: "Project Structure",
      href: "/project-structure",
    },
  ];

  const apiLinks: DocLinks[] = [
    {
      name: "Controller",
      href: "/controller",
    },
    {
      name: "Middleware",
      href: "/middleware",
    },
    {
      name: "Model",
      href: "/model",
    },
    {
      name: "React",
      href: "/react",
    },
    {
      name: "Router",
      href: "/router",
    },
    {
      name: "Storage",
      href: "/storage",
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 top-0 left-0 bg-white h-screen border-r p-4 pt-16">
        <div className="prose prose-sm prose-a:no-underline prose-ul:list-none prose-ul:p-0">
          <h3>Documentation</h3>
          <ul className="prose-li:pl-2 pr-2">
            <li>
              <a href="#get-start" className="font-bold">
                Get start
              </a>
              <ul>
                {getStartLinks.map((value, index) => (
                  <li
                    key={index}
                    className="data-[active=true]:bg-black/10 rounded"
                    data-active={window.location.pathname.endsWith(value.href)}
                  >
                    <a href={`${BASE_URL}/docs${value.href}`}>{value.name}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="#api-reference" className="font-bold">
                API Reference
              </a>
              <ul>
                {apiLinks.map((value, index) => (
                  <li
                    key={index}
                    className="data-[active=true]:bg-black/10 rounded"
                    data-active={window.location.pathname.endsWith(value.href)}
                  >
                    <a href={`${BASE_URL}/docs${value.href}`}>{value.name}</a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <div className="prose max-w-6xl py-10 ml-96">
        {name && (
          <Suspense fallback={<></>}>
            <Content />
          </Suspense>
        )}
        {!name && (
          <div className="grid grid-cols-2 gap-8">
            <div className="shadow border rounded p-4">
              <h3 className="mt-0">Get Start</h3>
              <ul>
                {getStartLinks.map((value, index) => (
                  <li key={index}>
                    <a href={`${BASE_URL}/docs${value.href}`}>{value.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shadow border rounded p-4">
              <h3 className="mt-0">API Reference</h3>
              <ul>
                {apiLinks.map((value, index) => (
                  <li key={index}>
                    <a href={`${BASE_URL}/docs${value.href}`}>{value.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
