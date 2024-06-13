<?php

namespace App\Controllers;

use App\Controller;
use App\React;

class DocsController extends Controller {
  public function index() {
    React::render("Docs");
  }
}
