<?php

namespace App\Graphql\Types;

use App\Graphql\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => static fn() => [
                'example' => [
                    'type' => new MutationOutputType('ExampleMutation', TypeRegistry::type(ExampleType::class)),
                    'args' => [
                        'value' => Type::string()
                    ],
                    'resolve' => static fn($rootValue, array $args): array => [
                        'operation' => 'insert',
                        'success' => true,
                        'output' => ['message' => 'You have input ' . $args['value']]
                    ]
                ],
            ]
        ]);
    }
}
