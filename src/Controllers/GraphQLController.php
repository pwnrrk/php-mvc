<?php

namespace App\Controllers;

use GraphQL\GraphQL;
use App\Controller;
use App\Graphql\Schema;
use GraphQL\Error\DebugFlag;
use GraphQL\Error\FormattedError;

class GraphQLController extends Controller
{
  public function index()
  {
    try {

      $schema = new Schema();
      $input = $this->body();
      $query = $input['query'] ?? null;
      $mutation = $input['mutation'] ?? null;
      $variableValues = isset($input['variables']) ? $input['variables'] : null;

      $result = GraphQL::executeQuery($schema, $query ?? $mutation, null, null, $variableValues);
      $output = $result->toArray($_ENV['MODE'] == 'production' ? DebugFlag::NONE : DebugFlag::INCLUDE_DEBUG_MESSAGE);

      $this->json($output);
    } catch (\Exception $e) {
      $body = [
        'errors' => [FormattedError::createFromException($e)]
      ];
      $this->status(500);
      $this->body($body);
    }
  }
}
