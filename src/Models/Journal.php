<?php

namespace App\Models;

use App\Storage;

class Journal
{
  public $id;
  public $name;
  public $content;
  public $publishedDate;
  public $read;

  public function __construct($name, $content, $publishedDate = null, $read = 0)
  {
    $this->id = uniqid();
    $this->name = $name;
    $this->publishedDate = $publishedDate ?? date("Y-m-d");
    $this->content = $content;
    $this->read = $read;
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
      $journal = new Journal($row['name'], $row['content'], $row['publishedDate'], $row['read']);
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

  public function destroy()
  {
    $journals = Journal::getAll();
    $index = false;
    foreach ($journals as $key => $row) {
      if ($row->id == $this->id) $index = $key;
    }
    array_splice($journals, $index, 1);
    $json = json_encode($journals);
    file_put_contents(Storage::path("journals.json"), $json);
    return true;
  }
}
