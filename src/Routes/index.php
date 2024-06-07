<?php

use App\Controllers\HomeController;
use App\Controllers\JournalController;
use App\Router;

$router = new Router();

$router->get("/", HomeController::class, 'index');
$router->get("/create", HomeController::class, 'create');
$router->get("/view/{id}", HomeController::class, 'show');
$router->get("/api/journals", JournalController::class, 'index');
$router->post("/api/journals", JournalController::class, 'create');
$router->get("/api/journals/{id}", JournalController::class, 'get');
$router->put("/api/journals/{id}", JournalController::class, 'update');
$router->delete("/api/journals/{id}", JournalController::class, "destroy");
$router->dispatch();
