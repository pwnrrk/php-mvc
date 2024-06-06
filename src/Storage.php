<?php

namespace App;

class Storage
{
  const ROOT = __DIR__ . "\..\storage";

  public static function path($file)
  {
    $path = __DIR__ . "\..\storage\\$file";
    if (file_exists($path)) {
      return $path;
    }
    throw new \Exception("File or directory is not exists.");
  }
}
