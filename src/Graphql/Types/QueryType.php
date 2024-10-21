<?php

namespace App\Graphql\Types;

use App\Graphql\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;

class QueryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => static fn() => [
                'example' => [
                    'type' => TypeRegistry::type(ExampleType::class),
                    'resolve' => static fn($rootValue, $args) => 'Hello World!'
                ]
            ]
        ]);
    }
}
