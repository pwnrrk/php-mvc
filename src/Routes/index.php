<?php

use App\Controllers\AuthController;
use App\Controllers\FileController;
use App\Controllers\GraphQLController;
use App\Controllers\HomeController;
use App\Middlewares\AuthMiddleware;
use App\Router;

$router = new Router();


$router->post("/graphql", GraphQLController::class, "index", [AuthMiddleware::class]);

$router->group("/file", function (Router $fileRouter) {
    $fileRouter->get("/avatar/{code}", FileController::class, 'getAvatar');
    $fileRouter->post("/{destination}", FileController::class, "save");
    $fileRouter->post("/", FileController::class, "save");
}, [AuthMiddleware::class]);

$router->group("/auth", function (Router $authRouter) {
    $authRouter->post("/", AuthController::class, 'login');
    $authRouter->delete("/", AuthController::class, 'logout');
});

$router->get('.*', HomeController::class, 'index');

$router->dispatch();
