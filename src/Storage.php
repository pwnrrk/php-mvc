<?php

namespace App;

/**
 * Class Storage
 *
 * A class for handling file and directory operations in the storage directory.
 */
class Storage
{
  /**
   * The root path of the storage directory.
   */
  const ROOT = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'storage';

  /**
   * Get the full path of a file or directory in the storage directory.
   *
   * @param string $file The relative path of the file or directory.
   * @return string The full path.
   * @throws \Exception If the file or directory does not exist.
   */
  public static function path($file)
  {
    $path = self::ROOT . DIRECTORY_SEPARATOR . $file;
    if (file_exists($path)) {
      return $path;
    }
    throw new \Exception("File or directory does not exist.");
  }

  /**
   * Create a new file in the storage directory.
   *
   * @param string $file The relative path of the file.
   * @param string $content The content to write to the file.
   * @return void
   * @throws \Exception If the file could not be created.
   */
  public static function createFile($file, $content = '')
  {
    $path = self::ROOT . DIRECTORY_SEPARATOR . $file;
    if (file_put_contents($path, $content) === false) {
      throw new \Exception("Failed to create file.");
    }
  }

  /**
   * Read the content of a file in the storage directory.
   *
   * @param string $file The relative path of the file.
   * @return string The file content.
   * @throws \Exception If the file does not exist or could not be read.
   */
  public static function readFile($file)
  {
    $path = self::path($file);
    $content = file_get_contents($path);
    if ($content === false) {
      throw new \Exception("Failed to read file.");
    }
    return $content;
  }

  /**
   * Delete a file in the storage directory.
   *
   * @param string $file The relative path of the file.
   * @return void
   * @throws \Exception If the file does not exist or could not be deleted.
   */
  public static function deleteFile($file)
  {
    $path = self::path($file);
    if (!unlink($path)) {
      throw new \Exception("Failed to delete file.");
    }
  }

  /**
   * Create a new directory in the storage directory.
   *
   * @param string $directory The relative path of the directory.
   * @param int $permissions The permissions for the directory.
   * @return void
   * @throws \Exception If the directory could not be created.
   */
  public static function createDirectory($directory, $permissions = 0755)
  {
    $path = self::ROOT . DIRECTORY_SEPARATOR . $directory;
    if (!mkdir($path, $permissions, true) && !is_dir($path)) {
      throw new \Exception("Failed to create directory.");
    }
  }

  /**
   * Delete a directory in the storage directory.
   *
   * @param string $directory The relative path of the directory.
   * @return void
   * @throws \Exception If the directory does not exist or could not be deleted.
   */
  public static function deleteDirectory($directory)
  {
    $path = self::path($directory);
    if (!rmdir($path)) {
      throw new \Exception("Failed to delete directory.");
    }
  }

  /**
   * Copy a file or directory to a new location within the storage directory.
   *
   * @param string $source The relative path of the source file or directory.
   * @param string $destination The relative path of the destination.
   * @return void
   * @throws \Exception If the source does not exist or the copy operation fails.
   */
  public static function copy($source, $destination)
  {
    $sourcePath = self::path($source);
    $destinationPath = self::ROOT . DIRECTORY_SEPARATOR . $destination;
    if (is_dir($sourcePath)) {
      self::copyDirectory($sourcePath, $destinationPath);
    } else {
      if (!copy($sourcePath, $destinationPath)) {
        throw new \Exception("Failed to copy file.");
      }
    }
  }

  /**
   * Move a file or directory to a new location within the storage directory.
   *
   * @param string $source The relative path of the source file or directory.
   * @param string $destination The relative path of the destination.
   * @return void
   * @throws \Exception If the source does not exist or the move operation fails.
   */
  public static function move($source, $destination)
  {
    $sourcePath = self::path($source);
    $destinationPath = self::ROOT . DIRECTORY_SEPARATOR . $destination;
    if (!rename($sourcePath, $destinationPath)) {
      throw new \Exception("Failed to move file or directory.");
    }
  }

  /**
   * Recursively copy a directory.
   *
   * @param string $source The source directory.
   * @param string $destination The destination directory.
   * @return void
   * @throws \Exception If the copy operation fails.
   */
  protected static function copyDirectory($source, $destination)
  {
    if (!is_dir($destination)) {
      if (!mkdir($destination, 0755, true) && !is_dir($destination)) {
        throw new \Exception("Failed to create destination directory.");
      }
    }
    foreach (scandir($source) as $item) {
      if ($item === '.' || $item === '..') {
        continue;
      }
      $src = $source . DIRECTORY_SEPARATOR . $item;
      $dest = $destination . DIRECTORY_SEPARATOR . $item;
      if (is_dir($src)) {
        self::copyDirectory($src, $dest);
      } else {
        if (!copy($src, $dest)) {
          throw new \Exception("Failed to copy file: $src");
        }
      }
    }
  }
}
