<?php

namespace App\Controllers;

use App\Controller;
use App\React;

class HomeController extends Controller
{
  public function index()
  {
    return React::render("Home");
  }
}
