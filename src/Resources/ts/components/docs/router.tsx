export default function Router() {
  return (
    <section id="router">
      <h1>API Reference - Router Class</h1>
      <p>
        This document provides an overview of the <code>Router</code> class
        within the <code>App</code> namespace.
      </p>

      <h2>Class: Router</h2>
      <p>A simple router class for handling HTTP method-based routing.</p>

      <h3>Properties</h3>
      <ul>
        <li>
          <strong>
            <code>protected $routes</code>
          </strong>{" "}
          - Stores registered routes by HTTP method.
        </li>
        <li>
          <strong>
            <code>protected $groupPrefix</code>
          </strong>{" "}
          - Stores the current route group prefix.
        </li>
        <li>
          <strong>
            <code>protected $groupMiddlewares</code>
          </strong>{" "}
          - Stores the current route group middlewares.
        </li>
      </ul>

      <h3>addRoute</h3>
      <p>
        <strong>Description:</strong> Adds a route to the router for a specific
        HTTP method.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $route</code> - The URL route pattern.
        </li>
        <li>
          <code>string $controller</code> - The controller class name.
        </li>
        <li>
          <code>string $action</code> - The method name within the controller
          class.
        </li>
        <li>
          <code>string $method</code> - The HTTP method for the route.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          route. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>get</h3>
      <p>
        <strong>Description:</strong> Registers a route for HTTP GET method.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $route</code> - The URL route pattern.
        </li>
        <li>
          <code>string $controller</code> - The controller class name.
        </li>
        <li>
          <code>string $action</code> - The method name within the controller
          class.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          route. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>post</h3>
      <p>
        <strong>Description:</strong> Registers a route for HTTP POST method.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $route</code> - The URL route pattern.
        </li>
        <li>
          <code>string $controller</code> - The controller class name.
        </li>
        <li>
          <code>string $action</code> - The method name within the controller
          class.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          route. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>put</h3>
      <p>
        <strong>Description:</strong> Registers a route for HTTP PUT method.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $route</code> - The URL route pattern.
        </li>
        <li>
          <code>string $controller</code> - The controller class name.
        </li>
        <li>
          <code>string $action</code> - The method name within the controller
          class.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          route. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>delete</h3>
      <p>
        <strong>Description:</strong> Registers a route for HTTP DELETE method.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $route</code> - The URL route pattern.
        </li>
        <li>
          <code>string $controller</code> - The controller class name.
        </li>
        <li>
          <code>string $action</code> - The method name within the controller
          class.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          route. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>patch</h3>
      <p>
        <strong>Description:</strong> Registers a route for HTTP PATCH method.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $route</code> - The URL route pattern.
        </li>
        <li>
          <code>string $controller</code> - The controller class name.
        </li>
        <li>
          <code>string $action</code> - The method name within the controller
          class.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          route. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>group</h3>
      <p>
        <strong>Description:</strong> Groups routes under a common prefix.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $prefix</code> - The common route prefix.
        </li>
        <li>
          <code>callable $callback</code> - A callback function to define routes
          within the group.
        </li>
        <li>
          <code>array $middlewares</code> - The middlewares to be applied to the
          group. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>dispatch</h3>
      <p>
        <strong>Description:</strong> Dispatches the current request to the
        appropriate controller action based on registered routes.
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If no route is found
        for the requested URI.
      </p>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>

      <h3>isMatchingRoute</h3>
      <p>
        <strong>Description:</strong> Check if the requested URI matches the
        given route pattern.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $uri</code> - Requested URI.
        </li>
        <li>
          <code>string $route</code> - Route pattern.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>bool</code> - True if the URI matches
        the route, false otherwise.
      </p>

      <h3>extractParams</h3>
      <p>
        <strong>Description:</strong> Extract route parameters from the URI.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $uri</code> - Requested URI.
        </li>
        <li>
          <code>string $route</code> - Route pattern.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>array</code> - Associative array of
        route parameters.
      </p>
    </section>
  );
}
