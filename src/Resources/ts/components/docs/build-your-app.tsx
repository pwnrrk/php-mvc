import hljs from "highlight.js";
import "highlight.js/styles/nord.css";
import { BASE_URL } from "../../constant";

export default function BuildYourApp() {
  return (
    <section>
      <h1>Building your app</h1>
      <h2>Handling the request</h2>
      This is the example of basic request handling
      <ol>
        <li>
          <h3>Create a controller</h3>
          This project provide a base controller class that have many useful
          methods for handling http request.
          <ul>
            <li>
              Create file <b>HelloController.php</b> in{" "}
              <b>
                <i>src/Controllers</i>
              </b>
            </li>
            <li>
              Put these code in the file
              <pre
                className="hljs theme-nord"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(
                    `<?php

namespace App\\Controllers;

use App\\Controller;

class HelloController extends Controller
{
  public function index()
  {
    $this->render("Hello");
  }
}
`,
                    { language: "php" }
                  ).value,
                }}
              ></pre>
            </li>
          </ul>
        </li>
        <li>
          <h3>Add route</h3>
          Register the route to use the controller we just created.
          <ul>
            <li>
              Edit file{" "}
              <b>
                <i>src/Routes/index.php</i>
              </b>
            </li>
            <li>
              Add the follow code the the file
              <pre
                className="hljs theme-nord"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(
                    `<?php
// ... Previous code

use App\\Controllers\\HelloController;

$router->get("/hello", HelloController::class, "index");

`,
                    { language: "php" }
                  ).value,
                }}
              ></pre>
            </li>
          </ul>
        </li>
        <li>
          <h3>Create a view</h3>
          After we register the route. Now we have to create the view so the
          controller can render what we need.
          <ul>
            <li>
              Create file <b>Hello.php</b> in{" "}
              <b>
                <i>src/Views</i>
              </b>
            </li>
            <li>
              Put this code to the file
              <pre
                className="hljs theme-nord"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(
                    `<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello from PHP!</h1>
  </body>
</html>`,
                    { language: "html" }
                  ).value,
                }}
              ></pre>
            </li>
          </ul>
        </li>
        <li>
          <h3>Test your app</h3>
          Now let's see what have we done. We create{" "}
          <b>src/Controllers/HelloController.php</b> to process the http request
          and register it to the <b>src/Routes/index.php</b> with endpoint
          "/hello" and use <b>src/Views/Hello.php</b> to handle the rendering
          process. Let's see the result.
          <ul>
            <li>
              Run PHP Development server. See{" "}
              <a
                href={`${BASE_URL}/docs/installation#running-development-server`}
              >
                Running development sever
              </a>{" "}
              for detail.
            </li>
            <li>
              Go to{" "}
              <a href="http://localhost:8000/hello">
                http://localhost:8000/hello
              </a>
              . You should see the "Hello from PHP!"
            </li>
          </ul>
        </li>
      </ol>
      <p>
        You can use controller to handle http response such as form posting,
        JSON Response and more.
      </p>
      <h2>Render with React</h2>
      The previous example is the server-side Rendering with PHP. But when you
      need your app to be more interactive to the user.The client-side rendering
      using React could make it more easier to implements.
      <ol>
        <li>
          <h3>Use React class</h3>
          This project provided the React class for select page component to
          render and embed the data to it before sending to the client
          <ul>
            <li>
              Edit <b>src/Controllers/HelloController.php</b>
            </li>
            <li>
              Update the code to look like this
              <pre
                className="hljs theme-nord"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(
                    `<?php
// ... Previous code
use App\\React;

class HelloController extends Controller
{
  public function index()
  {
    React::render("Hello");
  }
}
`,
                    { language: "php" }
                  ).value,
                }}
              ></pre>
            </li>
          </ul>
        </li>
        <li>
          <h3>Create React page component</h3>
          React class will look for component to render with the path{" "}
          <b>src/Resources/ts/Pages/Home.tsx</b> and throw exception is no file
          exists.
          <ul>
            <li>
              Create file <b>Home.tsx</b> in{" "}
              <b>
                <i>src/Resources/ts/Pages</i>
              </b>
            </li>
            <li>
              Put this code in the file
              <pre
                className="hljs theme-nord"
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(
                    `export default function Hello() {
  return <h1>Hello React Component!</h1>
}`,
                    { language: "tsx" }
                  ).value,
                }}
              ></pre>
            </li>
            <li>
              Now when you navigate to the page. You should see "Hello React
              Component!".
            </li>
          </ul>
        </li>
      </ol>
      <h2>Route grouping</h2>
      You can group the route to increase readability of your code.
      <h2>Add Middleware</h2>
      We can add the middlewares to handle some process before the controller
      execute. Such as authentication, form validation, etc.
    </section>
  );
}
