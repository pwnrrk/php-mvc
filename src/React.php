<?php

namespace App;

class React
{
  static function render($component, $data = [])
  {
    $json = json_encode($data);
    include "Views/main.php";
    echo "<script id='react-value'>";
    echo "window._react_page = '$component';window._react_props = $json;";
    echo "</script>";
  }
}
