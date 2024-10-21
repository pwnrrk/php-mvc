<?php

use App\Controllers\API\JournalController;
use App\Controllers\GraphQLController;
use App\Controllers\HomeController;
use App\Router;

$router = new Router();

$router->post('/graphql', GraphQLController::class, 'index');
$router->group('/api', function (Router $api) {
    $api->get('/journals', JournalController::class, 'index');
});
$router->get('.*', HomeController::class, 'index');

$router->dispatch();
