<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Journal;

class JournalController extends Controller
{
  public function index()
  {
    $journals = Journal::getAll();

    $this->json($journals);
  }

  public function show($params)
  {
    $journal = Journal::getById($params['id']);
    $this->json($journal);
  }

  public function create()
  {
    $data = $this->body() ?? $_REQUEST;
    $journal = new Journal($data['name'], $data['publishedDate']);
    $journal->save();
    $this->json($data);
  }
}
