<?php

namespace App;

class Order
{
  public string $field;
  public string $direction;

  public function __construct(array $args)
  {
    $this->field = $args['field'];
    $this->direction = $args['direction'];
  }
}
