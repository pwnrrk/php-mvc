<?php

namespace App\Graphql;

use App\Graphql\Types\MutationType;
use App\Graphql\Types\QueryType;
use GraphQL\Type\Schema as BaseSchema;
use GraphQL\Type\SchemaConfig;

class Schema extends BaseSchema
{
  public function __construct()
  {
    $config = new SchemaConfig();
    $config->setQuery(static fn() => new QueryType());
    $config->setMutation(static fn() => new MutationType());
    parent::__construct($config);
  }
}
