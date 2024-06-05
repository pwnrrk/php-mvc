<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Journal;

class JournalController extends Controller
{
  public function index()
  {
    $journals = [
      new Journal("Third Journal Entry", "2024"),
      new Journal("Second Journal Entry", "2023"),
      new Journal("First Journal Entry", "2022"),
    ];

    $this->json($journals);
  }
}
