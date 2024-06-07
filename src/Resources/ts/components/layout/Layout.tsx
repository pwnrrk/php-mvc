import React, { PropsWithChildren } from "react";
import Link from "../Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <nav className="p-1 px-4 xl:px-12 shadow border-b min-h-12 flex items-center">
        <div className="flex-1">
          <span className="text-xl font-medium">Journals</span>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-180px)]">{children}</main>
      <footer className="p-4 bg-black text-white flex gap-48 flex-wrap justify-center">
        <div>
          <div className="text-2xl font-semibold">Journals</div>
          <p>PHP MVC and React (Typescript) example</p>
        </div>
        <div>
          <div className="my-2">
            <b>Reference</b>
          </div>
          <ul>
            <li>
              <Link className="text-inherit" href="https://www.php.net/">
                PHP
              </Link>
            </li>
            <li>
              <Link className="text-inherit" href="https://react.dev/">
                React
              </Link>
            </li>
            <li>
              <Link
                className="text-inherit"
                href="https://www.typescriptlang.org/"
              >
                Typescript
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="my-2">
            <b>Requirement</b>
          </div>
          <ul>
            <li>
              <Link className="text-inherit" href="https://getcomposer.org/">
                Composer
              </Link>
            </li>
            <li>
              <Link className="text-inherit" href="https://nodejs.org/en">
                Node.js
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="my-2">
            <b>Links</b>
          </div>
          <div className="space-x-4">
            <a href="">
              <FontAwesomeIcon icon={faGithub} className="size-8" />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faInstagram} className="size-8" />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faLinkedin} className="size-8" />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faDiscord} className="size-8" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
