<?php

use App\Configs\ServerConfig;
?>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MVC from scratch</title>
  <link rel="stylesheet" href="<?= ServerConfig::BASE_URL ?>/dist/main.css">
  <script defer src="<?= ServerConfig::BASE_URL ?>/dist/main.js"></script>
</head>

<body>
  <div id="app"></div>
</body>

</html>