<?php

namespace App;

/**
 * Class Router
 *
 * A simple router class for handling HTTP method-based routing.
 */
class Router
{
  /**
   * @var array Stores registered routes by HTTP method.
   */
  protected $routes = [];

  /**
   * Adds a route to the router for a specific HTTP method.
   *
   * @param string $route The URL route pattern.
   * @param string $controller The controller class name.
   * @param string $action The method name within the controller class.
   * @param string $method The HTTP method for the route.
   * @return void
   */
  private function addRoute($route, $controller, $action, $method)
  {
    $this->routes[$method][$route] = ['controller' => $controller, 'action' => $action];
  }

  /**
   * Registers a route for HTTP GET method.
   *
   * @param string $route The URL route pattern.
   * @param string $controller The controller class name.
   * @param string $action The method name within the controller class.
   * @return void
   */
  public function get($route, $controller, $action)
  {
    $this->addRoute($route, $controller, $action, "GET");
  }

  /**
   * Registers a route for HTTP POST method.
   *
   * @param string $route The URL route pattern.
   * @param string $controller The controller class name.
   * @param string $action The method name within the controller class.
   * @return void
   */
  public function post($route, $controller, $action)
  {
    $this->addRoute($route, $controller, $action, "POST");
  }

  /**
   * Registers a route for HTTP PUT method.
   *
   * @param string $route The URL route pattern.
   * @param string $controller The controller class name.
   * @param string $action The method name within the controller class.
   * @return void
   */
  public function put($route, $controller, $action)
  {
    $this->addRoute($route, $controller, $action, "PUT");
  }

  /**
   * Registers a route for HTTP DELETE method.
   *
   * @param string $route The URL route pattern.
   * @param string $controller The controller class name.
   * @param string $action The method name within the controller class.
   * @return void
   */
  public function delete($route, $controller, $action)
  {
    $this->addRoute($route, $controller, $action, "DELETE");
  }

  /**
   * Registers a route for HTTP PATCH method.
   *
   * @param string $route The URL route pattern.
   * @param string $controller The controller class name.
   * @param string $action The method name within the controller class.
   * @return void
   */
  public function patch($route, $controller, $action)
  {
    $this->addRoute($route, $controller, $action, "PATCH");
  }

  /**
   * Dispatches the current request to the appropriate controller action based on registered routes.
   *
   * @throws \Exception If no route is found for the requested URI.
   * @return void
   */
  public function dispatch()
  {
    $uri = strtok($_SERVER["REQUEST_URI"], "?");
    $method = $_SERVER["REQUEST_METHOD"];

    foreach ($this->routes[$method] as $route => $value) {
      if ($this->isMatchingRoute($uri, $route)) {
        $controller = $value['controller'];
        $action = $value['action'];
        $params = $this->extractParams($uri, $route);
        $controller = new $controller();
        $controller->$action($params);
        return;
      }
    }
    throw new \Exception("No route found for URI: $uri");
  }

  /**
   * Check if the requested URI matches the given route pattern.
   *
   * @param string $uri Requested URI
   * @param string $route Route pattern
   * @return bool True if the URI matches the route, false otherwise
   */
  protected function isMatchingRoute($uri, $route)
  {
    // Replace route parameters with regex pattern
    $pattern = preg_replace('~/{([^/]+)}~', '/([^/]+)', $route);
    $pattern = '~^' . $pattern . '$~';

    // Check if the URI matches the pattern
    if (preg_match($pattern, $uri, $matches)) {
      array_shift($matches); // Remove the full match
      return true;
    }

    return false;
  }

  /**
   * Extract route parameters from the URI.
   *
   * @param string $uri Requested URI
   * @param string $route Route pattern
   * @return array Associative array of route parameters
   */
  protected function extractParams($uri, $route)
  {
    $params = [];
    $parts = explode('/', $uri);
    $routeParts = explode('/', $route);

    foreach ($routeParts as $index => $part) {
      if (strpos($part, '{') === 0 && strpos($part, '}') === strlen($part) - 1) {
        // Found route parameter
        $paramName = substr($part, 1, -1);
        $params[$paramName] = $parts[$index];
      }
    }

    return $params;
  }
}
