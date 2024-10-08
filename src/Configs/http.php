<?php

namespace App\Configs;

define("BASE_URL", $_ENV['BASE_URL']);

// Set a custom error handler
set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    // error was suppressed with the @-operator
    if (0 === error_reporting()) {
        return false;
    }

    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});
