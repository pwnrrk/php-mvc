<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ExampleType extends ObjectType
{
  public function __construct()
  {
    parent::__construct([
      'name' => 'ExampleResult',
      'fields' => [
        'message' => Type::string()
      ]
    ]);
  }
}