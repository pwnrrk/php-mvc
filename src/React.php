<?php

namespace App;

class React
{
  static function render($component, $data = [])
  {
    $json = json_encode($data);
    include "template.php";
    echo "<script defer>document.onload = window.render('$component', JSON.parse('$json'))</script>";
  }
}
