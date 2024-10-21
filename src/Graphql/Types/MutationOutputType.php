<?php

namespace App\Graphql\Types;

use App\Graphql\ClientException;
use Closure;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class MutationOutputType extends ObjectType
{
  public function __construct(string $name, Closure $type)
  {
    parent::__construct([
      'name' => $name,
      'fields' => [
        'operation' => Type::string(),
        'success' => Type::boolean(),
        'output' => $type,
      ]
    ]);
  }

  public static function resolveInsert(string $model, array $args, callable $validator = null)
  {
    if ($validator && is_callable($validator)) $validator();

    $output = ['operation' => 'insert'];
    $instance = new $model($args['input']);
    $instance->save();
    $output['output'] = $instance;
    $output['success'] = true;
    return $output;
  }

  public static function resolveUpdate(string $model, array $args, array $columns, callable $validator = null)
  {
    if ($validator && is_callable($validator)) $validator();

    $output = ['operation' => 'update', 'success' => false];
    $instance = $model::getById($args['id']);
    if (!$instance) throw new ClientException("Member not found");

    foreach ($columns as $column) {
      if (isset($args['input'][$column])) $instance->$column = $args['input'][$column];
    }

    $instance->save();

    $output['success'] = true;
    $output['output'] = $instance;

    return $output;
  }

  public static function resolveDelete(string $model, array $args, callable $validator = null)
  {
    if ($validator && is_callable($validator)) $validator();

    $output = ['operation' => 'delete'];
    $instance = $model::getById($args['id']);
    if (!$instance) throw new ClientException("Object not found");

    $instance->destroy();

    $output['success'] = true;
    $output['output'] = $instance;

    return $output;
  }
}
