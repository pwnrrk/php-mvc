<?php

namespace App\Models;

use App\Storage;

class Journal
{
  public $id;
  public $name;
  public $publishedDate;

  public function __construct($name, $publishedDate)
  {
    $this->id = uniqid();
    $this->name = $name;
    $this->publishedDate = $publishedDate;
  }

  /**
   * @return Journal[]
   */
  public static function getAll()
  {
    $json = file_get_contents(Storage::path("journals.json"));
    $data = json_decode($json, true);
    $journals = [];
    foreach ($data as $row) {
      $journal = new Journal($row['name'], $row['publishedDate']);
      $journal->id = $row['id'];
      array_push($journals, $journal);
    }
    return $journals;
  }

  public static function getById($id)
  {
    $journals = Journal::getAll();

    $index = false;

    foreach ($journals as $key => $row) {
      if ($row->id == $id) $index = $key;
    }

    return $journals[$index];
  }

  public function save()
  {
    $journals = Journal::getAll();
    array_push($journals, $this);
    $json = json_encode($journals);
    file_put_contents(Storage::path("journals.json"), $json);
    return true;
  }
}
