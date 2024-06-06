<?php

namespace App;

class React
{
  static function render($component, $data = [])
  {
    $json = json_encode($data);
    include "Views/main.php";
    echo "<script defer id='react-renderer'>document.onload = window.render('$component', JSON.parse('$json'))</script>";
  }
}
