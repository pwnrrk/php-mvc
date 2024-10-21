<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends InputObjectType
{
  public function __construct()
  {
    parent::__construct([
      'name' => 'Order',
      'fields' => [
        'field' => Type::string(),
        'direction' => Type::string()
      ]
    ]);
  }
}
