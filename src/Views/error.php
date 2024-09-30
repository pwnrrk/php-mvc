<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="<?= BASE_URL ?>/assets/index.css">
  <script defer src="<?= BASE_URL ?>/assets/index.js"></script>
</head>

<body>
  <div class="space-y-4 text-black/70 fixed top-[30%] left-[20%]">
    <h1 class="text-3xl">Oops! Something went wrong.</h1>
    <h2 class="text-lh"><?= $message; ?></h2>
    <div class="text-xs">
      <div>
        <code>
          File: <?= $file ?>
        </code>
      </div>
      <div>
        <code>
          Line: <?= $line ?>
        </code>
      </div>
    </div>
    <small class="font-semibold">Code <?= $code ?></small>
    <p><a class="underline font-medium" href="<?= BASE_URL ? BASE_URL : "/" ?>">Go back to Home</a></p>
  </div>
</body>

</html>