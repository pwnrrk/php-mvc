<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Journal;
use App\React;

class HomeController extends Controller
{
  public function index()
  {
    $journals = [
      new Journal("Third Journal Entry", "2024"),
      new Journal("Second Journal Entry", "2023"),
      new Journal("First Journal Entry", "2022"),
    ];

    return React::render("Home", ["journals" => $journals]);
  }

  public function show()
  {
    $journal = new Journal("First Journal Entry", "2022");
    return React::render("Journal", ["journal" => $journal]);
  }
}
