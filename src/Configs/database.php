<?php

namespace App\Configs;

define('DB_HOST', $_ENV['DB_HOST']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASS', $_ENV['DB_PASS']);
define('DB_NAME', $_ENV['DB_NAME']);
define('DSN', 'sqlsrv:Server=' . DB_HOST . ';' . 'Database=' . DB_NAME . ';');
define("DEFAULT_PAGE", 0);
define("DEFAULT_PAGE_SIZE", 25);
