<?php

namespace App\Graphql\Types;

use App\Graphql\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PageInfoType extends ObjectType
{
  public function __construct()
  {
    parent::__construct([
      'name' => 'PageInfo',
      'fields' => [
        'endCursor' => Type::string(),
        'hasNextPage' => Type::boolean(),
        'total' => Type::int(),
        'pageCursor' => TypeRegistry::type(PageCursorType::class)
      ]
    ]);
  }
}
