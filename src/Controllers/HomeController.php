<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Journal;
use App\React;

class HomeController extends Controller
{
  public function index()
  {
    return React::render("Home");
  }

  public function show($params)
  {
    $journal = Journal::getById($params['id']);
    return React::render("Example/Journal", ["journal" => $journal]);
  }

  public function create()
  {
    return React::render("Example/CreateJournal");
  }
}
