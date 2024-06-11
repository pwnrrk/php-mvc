import logo from "../../../assets/logo.png";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react";
import Link from "../Link";
import clsx from "clsx";
import {
  ClockIcon,
  HomeIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import Button from "../Button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <nav
        className={clsx(
          "p-2 shadow-inner border-b min-h-12 flex flex-col items-center h-screen sticky top-0 bottom-0 left-0",
          "bg-neutral-100"
        )}
      >
        <div>
          <a href="/" className="text-xl font-medium flex items-center gap-2">
            <img src={logo} alt="PHP-React" className="size-8" />
          </a>
        </div>
        <div className="my-4"></div>
        <div className="py-4 text-black/60 flex flex-col items-stretch w-full">
          <Button
            data-active
            className={clsx(
              "flex flex-col items-center py-2 hover:bg-black/5 bg-transparent text-black/60 ",
              "shadow-none border-none data-[active=true]:bg-black/10"
            )}
          >
            <div>
              <UserGroupIcon className="size-6" />
            </div>
            Members
          </Button>
          <Button
            className={clsx(
              "flex flex-col items-center py-2 hover:bg-black/5 bg-transparent text-black/60 ",
              "shadow-none border-none"
            )}
          >
            <div>
              <ClockIcon className="size-6" />
            </div>
            Reminder
          </Button>
          <Button
            className={clsx(
              "flex flex-col items-center py-2 hover:bg-black/5 bg-transparent text-black/60 ",
              "shadow-none border-none"
            )}
          >
            <div>
              <PaperAirplaneIcon className="size-6" />
            </div>
            Flight
          </Button>
        </div>
      </nav>
      <div className="grow">
        <main className="min-h-[calc(100vh-180px)]">{children}</main>
        <footer className="p-4 bg-black text-white flex gap-4 lg:gap-48 flex-col text-center lg:text-left lg:flex-row flex-wrap justify-center">
          <div>
            <div className="text-2xl font-semibold flex items-center gap-2">
              <img src={logo} alt="PHP-React" className="size-10" />
              <span>Journals</span>
            </div>
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
              <li>
                <Link className="text-inherit" href="https://tailwindcss.com/">
                  Tailwind CSS
                </Link>
              </li>
              <li>
                <Link className="text-inherit" href="https://headlessui.com/">
                  Headless UI
                </Link>
              </li>
              <li>
                <Link className="text-inherit" href="https://heroicons.com/">
                  Heroicons
                </Link>
              </li>
              <li>
                <Link className="text-inherit" href="https://fontawesome.com/">
                  Fontawesome
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
              <a href="https://github.com/pwnrrk/php-mvc">
                <FontAwesomeIcon icon={faGithub} className="size-8" />
              </a>
              <a href="https://www.instagram.com/r.phuwanat/">
                <FontAwesomeIcon icon={faInstagram} className="size-8" />
              </a>
              <a href="https://th.linkedin.com/in/phuwanat-raroengklin-524a03224">
                <FontAwesomeIcon icon={faLinkedin} className="size-8" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
