<?php

namespace App;

/**
 * Class Middleware
 *
 * An abstract class that defines the structure for middleware.
 * All middleware classes should extend this class and implement the handle method.
 */
abstract class Middleware
{
  /**
   * Handle the middleware logic.
   *
   * This method should be implemented by all middleware classes.
   * It should contain the logic to be executed before the route's controller action.
   *
   * @return bool True if the request should proceed to the next middleware or the controller action, false otherwise.
   */
  abstract public function handle();
}
