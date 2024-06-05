<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Journal;
use App\React;

class HomeController extends Controller
{
  public function index()
  {
    $journals = Journal::getAll();

    return React::render("Home", ["journals" => $journals]);
  }

  public function show($params)
  {
    $journal = Journal::getById($params['id']);
    return React::render("Journal", ["journal" => $journal]);
  }
}
