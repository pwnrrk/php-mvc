<?php

namespace App\Middlewares;

use App\Authenticate;
use App\Middleware;

class AuthMiddleware extends Middleware
{
  public function handle()
  {
    // Perform authentication check
    // Return true if the request should proceed, false otherwise
    if (!Authenticate::getCurrent()) {
      http_response_code(403);
      return false;
    }
    return true;
  }
}
