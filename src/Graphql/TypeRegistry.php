<?php

namespace App\Graphql;

/**
 * The TypeRegistry class provides a mechanism for managing and retrieving
 * instances of classes. It implements a singleton-like pattern to ensure
 * that each class is instantiated only once and cached for future access.
 */
class TypeRegistry
{
  /**
   * @var array An associative array that maps class names to their instances.
   * This array is used to store and retrieve instances of classes.
   */
  private static array $types = [];

  /**
   * Returns a closure that retrieves or creates an instance of the specified class.
   * 
   * The closure is a factory method that, when executed, will either return an
   * existing instance of the class from the $types array or create a new instance
   * and store it in the $types array for future access.
   *
   * @param string $className The fully qualified name of the class for which
   *                          an instance is to be retrieved or created.
   * 
   * @return \Closure A closure that, when invoked, returns an instance of the
   *                   specified class. If an instance does not already exist,
   *                   a new one will be created and stored in the $types array.
   * 
   * @throws \ReflectionException If the class specified by $className does not
   *                               exist or cannot be instantiated.
   */
  public static function type(string $className): \Closure
  {
    return static fn () => self::$types[$className] ??= new $className();
  }
}
