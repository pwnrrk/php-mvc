<?php

use App\Controllers\HomeController;
use App\Controllers\JournalController;
use App\Router;

$router = new Router();

$router->get("/", HomeController::class, 'index');
$router->get("/view", HomeController::class, 'show');
$router->get("/api/journals", JournalController::class, 'index');
$router->dispatch();
