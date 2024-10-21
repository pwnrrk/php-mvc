<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class FilterType extends InputObjectType
{
  public function __construct()
  {
    parent::__construct([
      'name' => 'Filter',
      'fields' => [
        'field' => Type::string(),
        'operator' => Type::string(),
        'value' => Type::string()
      ]
    ]);
  }
}
