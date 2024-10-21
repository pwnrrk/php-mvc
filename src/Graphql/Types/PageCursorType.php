<?php

namespace App\Graphql\Types;

use App\Graphql\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PageCursorType extends ObjectType
{
  public function __construct()
  {
    parent::__construct([
      'name' => 'PageCursor',
      'fields' => [
        'pages' => Type::listOf(TypeRegistry::type(CursorType::class)),
        'first' => TypeRegistry::type(CursorType::class),
        'previous' => TypeRegistry::type(CursorType::class),
        'current' => TypeRegistry::type(CursorType::class),
        'next' => TypeRegistry::type(CursorType::class),
        'last' => TypeRegistry::type(CursorType::class)
      ]
    ]);
  }
}
