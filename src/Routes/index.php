<?php

use App\Controllers\HomeController;
use App\Controllers\JournalController;
use App\Middlewares\AuthMiddleware;
use App\Router;

$router = new Router();

$router->get("/", HomeController::class, 'index');
$router->get("/create", HomeController::class, 'create');
$router->get("/view/{id}", HomeController::class, 'show');

$router->group("/api", function (Router $api) {
  $api->group("/journals", function (Router $journal) {
    $journal->get("/", JournalController::class, "index");
    $journal->post("/", JournalController::class, "create");
    $journal->get("/{id}", JournalController::class, "get");
    $journal->put("/{id}", JournalController::class, "update");
    $journal->delete("/{id}", JournalController::class, "destroy");
  });
}, [AuthMiddleware::class]);

$router->dispatch();
