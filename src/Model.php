<?php

namespace App;

abstract class Model
{
  public function __construct(array $attr)
  {
    foreach($attr as $key => $value) {
      $this->$key = $value;
    }
  }
  abstract public function save();
  abstract public function destroy();
  abstract public static function getAll();
  abstract public static function getById($id);
}
