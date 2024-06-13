<?php

use App\Controllers\API\JournalController;
use App\Controllers\DocsController;
use App\Controllers\HomeController;
use App\Controllers\ExampleController;
use App\Middlewares\AuthMiddleware;
use App\Router;

$router = new Router();

$router->get("/", HomeController::class, 'index');

$router->group("/docs", function (Router $docs) {
  $docs->get("/", DocsController::class, "index");
});

$router->group("/example", function (Router $example) {
  $example->get("/create", ExampleController::class, 'create');
  $example->get("/view/{id}", ExampleController::class, 'show');
});

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
