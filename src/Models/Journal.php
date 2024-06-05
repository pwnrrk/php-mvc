<?php

namespace App\Models;

class Journal
{
  public $name;
  public $publishedYear;

  public function __construct($name, $publishedYear)
  {
    $this->name = $name;
    $this->publishedYear = $publishedYear;
  }

  public static function getAll()
  {
    $journals = [
      new Journal("Third Journal Entry", "2024"),
      new Journal("Second Journal Entry", "2023"),
      new Journal("First Journal Entry", "2022"),
    ];

    return $journals;
  }

  public static function getById($id)
  {
    $journals = [
      new Journal("Third Journal Entry", "2024"),
      new Journal("Second Journal Entry", "2023"),
      new Journal("First Journal Entry", "2022"),
    ];

    return $journals[$id];
  }
}
