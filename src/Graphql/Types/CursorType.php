<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CursorType extends ObjectType
{
  public function __construct()
  {
    parent::__construct([
      'name' => 'Cursor',
      'fields' => [
        'cursor' => Type::string(),
        'isCurrent' => Type::boolean(),
        'pageNumber' => Type::int()
      ]
    ]);
  }
}
