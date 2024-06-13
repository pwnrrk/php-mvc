<?php

namespace App;

/**
 * Class Model
 *
 * Abstract class representing a generic model with basic CRUD operations.
 *
 * @package App
 */
abstract class Model
{
  /**
   * Model constructor.
   *
   * Initializes the model's properties using the given associative array.
   *
   * @param array $attr Associative array where keys are property names and values are property values.
   */
  public function __construct(array $attr)
  {
    foreach ($attr as $key => $value) {
      $this->$key = $value;
    }
  }

  /**
   * Save the current model instance.
   *
   * This method must be implemented by the subclass to handle saving the model instance.
   *
   * @return mixed The result of the save operation.
   */
  abstract public function save();

  /**
   * Destroy the current model instance.
   *
   * This method must be implemented by the subclass to handle deleting the model instance.
   *
   * @return mixed The result of the destroy operation.
   */
  abstract public function destroy();

  /**
   * Get all instances of the model.
   *
   * This method must be implemented by the subclass to handle retrieving all model instances.
   *
   * @return array An array of all model instances.
   */
  abstract public static function getAll();

  /**
   * Get a model instance by its ID.
   *
   * This method must be implemented by the subclass to handle retrieving a model instance by its ID.
   *
   * @param mixed $id The ID of the model instance to retrieve.
   * @return mixed The model instance with the specified ID.
   */
  abstract public static function getById($id);
}
