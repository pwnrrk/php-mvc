import Button from "../components/Button";
import Logo from "../../assets/logo.png";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";
import { BASE_URL } from "../constant";

export default function Home() {
  function gotoDocs() {
    window.location.href = `${BASE_URL}/docs`;
  }

  return (
    <div className="text-gray-700">
      <section
        id="banner"
        className="gap-4 pb-16 min-h-[30vh] flex flex-col items-center justify-center"
      >
        <img src={Logo} alt="PHPReact" className="w-[160px]" />
        <h1 className="text-5xl font-semibold">PHP + React</h1>
        <h2 className="text-3xl font-medium my-4">
          The MVC PHP with React Typescript starter project
        </h2>
        <div className="flex gap-4">
          <Button
            className="text-lg px-4"
            onClick={function () {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore
          </Button>
          <Button
            variant="secondary"
            className="text-lg px-4"
            onClick={gotoDocs}
          >
            Documentation
          </Button>
        </div>
      </section>
      <section
        id="about"
        className="py-16 px-3 bg-gradient-to-b from-neutral-100 to-white border shadow-inner text-center"
      >
        <div className="max-w-5xl mx-auto ">
          <div className="text-3xl font-medium mb-6">
            MVC PHP structure with the pre-fetch React components
          </div>
          <div className="text-xl">
            PHP React is a base structure for create PHP application including
            basic tasks such as routing, controller, model, etc. Let you build a
            API or Full-stack application with React components.
          </div>
          <div className="py-6 text-left grid md:grid-cols-2 gap-4">
            <pre
              className="w-full whitespace-pre-wrap hljs rounded p-4"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(
                  `<?php
// Controllers/HomeController.php

namespace App\\Controllers;

use App\\Controller;

class HomeController extends Controller 
{
  public function index()
  {
    $user = ["name" => "John"];
    $this->render("Home", [$user]);
  }
}`,
                  { language: "php" }
                ).value,
              }}
            ></pre>
            <pre
              className="whitespace-pre-wrap hljs rounded p-4"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(
                  `<!-- Views/Home.php -->
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <h1>Hello, <?php echo $user['name']; ?></h1>
  </body>
</html>`,
                  { language: "html" }
                ).value,
              }}
            ></pre>
          </div>
          <div className="text-xl">
            Or use React for client-side rendering with embed data from PHP
          </div>
          <div className="py-6 text-left grid md:grid-cols-2 gap-4">
            <pre
              className="whitespace-pre-wrap hljs rounded p-4"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(
                  `<?php
// Controllers/HomeController.php

namespace App\\Controllers;

use App\\Controller;
use App\\React;

class HomeController extends Controller 
{
  public function index()
  {
    $user = ["name" => "John"];
    React::render("Home", [$user]);
  }
}`,
                  { language: "php" }
                ).value,
              }}
            ></pre>
            <pre
              className="hljs rounded p-4 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(
                  `// Resources/ts/Pages/Home.tsx
interface HomeProps {
  user: {
    name: string
  }
}

export default function Home({ user }: HomeProps){
  return (
    <h1>Hello, {user.name}</h1>
  )
}`,
                  { language: "typescript" }
                ).value,
              }}
            ></pre>
          </div>
        </div>
      </section>
      <section className="py-16 px-3 bg-gradient-to-b from-neutral-100 to-white border shadow-inner text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 text-left">
          <div>
            <div className="text-3xl font-medium mb-6">
              Extend the project as your use cases
            </div>
            <div className="text-xl">
              Unlike framework. This is just a simple folder structure setup
              with minimal package dependencies. You can extends the code as
              your use cases .
            </div>
          </div>
          <div>
            <pre
              className="hljs rounded p-4"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(
                  `MyApp/
├── node_modules
├── public
├── src/
│   ├── Configs
│   ├── Controllers
│   ├── Middlewares
│   ├── Models
│   ├── Resources/
│   │   ├── assets
│   │   ├── css
│   │   └── ts/
│   │       ├── components
│   │       └── Pages
│   └── Views
├── storage
└── vendor`,
                  { language: "shell" }
                ).value,
              }}
            ></pre>
          </div>
        </div>
      </section>
      <section className="py-16 px-3 bg-gradient-to-b from-neutral-100 to-white border shadow-inner text-center">
        <div className="max-w-5xl mx-auto gap-4 py-16">
          <div className="text-3xl font-medium mb-6">Why not framework ?</div>
          <div className="text-xl mb-6">
            From our experience of migrating internal web application of our
            company to newer version of PHP. We found that we have to keep many
            "Legacy Code" and using framework we might need to re-write the
            whole application. Some feature we don't need. And some feature we
            want it to be flexible to extends. So we just organize the project
            structure and do some improvement of routing and rendering.
          </div>
          <div className="text-3xl font-medium mb-6">Ready for building ?</div>
          <Button className={"text-xl px-4"} onClick={gotoDocs}>
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
