import logo from "../../../assets/logo.png";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Link from "../Link";
import clsx from "clsx";
import {
  Bars3Icon,
  DocumentIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";
import { BASE_URL } from "../../constant";
import Dropdown from "../Dropdown";

interface MenuItemValue {
  name: string;
  icon: ReactNode;
  href: string;
}

export default function Layout({ children }: PropsWithChildren) {
  const [currentScroll, setScroll] = useState(0);
  const menu: MenuItemValue[] = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className="size-6" />,
    },
    {
      name: "Docs",
      href: "/docs",
      icon: <DocumentIcon className="size-6" />,
    },
    {
      name: "Example",
      href: "/example",
      icon: <DocumentTextIcon className="size-6" />,
    },
  ];

  useEffect(() => {
    function listener() {
      setScroll(document.body.scrollTop);
    }
    document.addEventListener("scroll", listener);

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);

  const matchedLinks = menu.filter((item) =>
    window.location.pathname.startsWith(`${BASE_URL}${item.href}`)
  );

  return (
    <>
      <nav
        className={clsx(
          "p-2 px-4 min-h-12 flex gap-4 bg-white z-10 items-center sticky top-0 transition",
          currentScroll >= 250 && "border-b shadow"
        )}
      >
        <div className="md:flex-none flex-1">
          <a href="/" className="text-xl font-medium flex items-center gap-2">
            <img src={logo} alt="PHP-React" className="size-8" />
            PHP React
          </a>
        </div>
        <div className="text-black/60 hidden px-4 gap-4 md:flex">
          {menu.map(function (value, index) {
            return (
              <a
                key={index}
                href={`${BASE_URL}${value.href}`}
                data-active={
                  matchedLinks[matchedLinks.length - 1]?.name === value.name
                }
                className={clsx(
                  "hover:bg-black/5 bg-transparent rounded p-2 font-medium",
                  "data-[active=true]:bg-black/10"
                )}
              >
                {value.name}
              </a>
            );
          })}
        </div>
        <div className="md:hidden">
          <Dropdown
            buttonProps={{
              startIcon: <Bars3Icon className="size-4" />,
              variant: "secondary",
            }}
            menuItemsProps={{
              anchor: "bottom end"
            }}
            items={menu.map((item) => ({
              label: item.name,
              onClick() {
                window.location.href = `${BASE_URL}${item.href}`;
              },
            }))}
          />
        </div>
      </nav>
      <main className="min-h-[calc(100vh-180px)]">{children}</main>
      <footer className="p-4 relative bg-black text-white flex gap-4 lg:gap-32 flex-col text-center lg:text-left lg:flex-row flex-wrap justify-center">
        <div>
          <div className="text-2xl font-semibold flex items-center gap-2">
            <img src={logo} alt="PHP-React" className="size-10" />
            <span>PHP React</span>
          </div>
          <p>The MVC PHP with React Typescript starter project</p>
          <small>R.Phuwanat</small>
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
    </>
  );
}
