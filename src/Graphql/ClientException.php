<?php

namespace App\Graphql;

use Exception;
use GraphQL\Error\ClientAware;
use GraphQL\Error\ProvidesExtensions;

class ClientException extends Exception implements ClientAware, ProvidesExtensions
{
  public $extensions;
  /**
   * @param array|object $extensions
   */
  public function __construct($extensions = null)
  {
    parent::__construct("Client Error");
    $this->extensions = $extensions;
  }
  public function isClientSafe(): bool
  {
    return true;
  }
  public function getExtensions(): ?array
  {
    return is_object($this->extensions) ? get_object_vars($this->extensions) : $this->extensions;
  }
}
