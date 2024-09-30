<?php

namespace App\Controllers;

use App\Controller;

class HomeController extends Controller
{
  public function index()
  {
    $this->send(file_get_contents(__DIR__ . "/../../dist/index.html"));
  }
}
