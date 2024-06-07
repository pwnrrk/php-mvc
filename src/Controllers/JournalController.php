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

  public function get($params)
  {
    $journal = Journal::getById($params['id']);
    $this->json($journal);
  }

  public function create()
  {
    $data = $this->body() ?? $_REQUEST;
    $journal = new Journal($data['name'], $data['content']);
    $journal->save();
    $this->json($journal);
  }

  public function destroy($params)
  {
    $id = $params['id'];
    $journal = Journal::getById($id);
    $journal->destroy();
    $this->status(204)->send();
  }

  public function update($params)
  {
    $id = $params['id'];
    $body = $this->body();
    $journal = Journal::getById($id);
    foreach ($body as $key => $value) {
      if ($key != "id") {
        $journal->$key = $value;
      }
    }
    $journal->save();
    $this->json($journal);
  }
}
