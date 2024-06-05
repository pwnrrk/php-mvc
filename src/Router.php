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

    if (array_key_exists($uri, $this->routes[$method])) {
      $controller = $this->routes[$method][$uri]['controller'];
      $action = $this->routes[$method][$uri]['action'];

      $controller = new $controller();
      $controller->$action();
    } else {
      throw new \Exception("No route found for URI: $uri");
    }
  }
}
