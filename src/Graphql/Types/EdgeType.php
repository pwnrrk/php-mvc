<?php

namespace App\Graphql\Types;

use App\Graphql\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class EdgeType extends ObjectType
{
  public function __construct($name, $type)
  {
    parent::__construct([
      'name' => $name,
      'fields' => [
        'cursor' => Type::string(),
        'node' => TypeRegistry::type($type)
      ]
    ]);
  }
}
