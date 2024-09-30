<?php
ob_start();
require "../vendor/autoload.php";
try {
    $dotenv  = Dotenv\Dotenv::createImmutable(__DIR__ . "/../");
    $dotenv->load();
    require "../src/Configs/http.php";
    require "../src/Configs/database.php";
    require "../src/Configs/ldap.php";
    require "../src/Routes/index.php";
} catch (Exception $err) {
    ob_clean();
    $code = $err->getCode();
    $message = $err->getMessage();
    $file = $err->getFile();
    $line = $err->getLine();
    if ($code < 100) {
        http_response_code(500);
    } else {
        http_response_code($code);
    }
    error_log($err);
    include "../src/Views/error.php";
}
