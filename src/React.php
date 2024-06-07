<?php

namespace App;

class React
{
  static function render($component, $data = [])
  {
    $json = json_encode($data);
    include "Views/main.php";
    echo "<script defer id='react-renderer'>";
    echo "let timer = setInterval(() => {
      if (!window.render) return;
      try {
        window.render('$component', $json)
      } catch (err) {
        console.error(err);
      } finally {
        clearInterval(timer);
      }
    },100)";
    echo "</script>";
  }
}
