<?php

namespace App\Graphql\Types;

use App\Graphql\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CollectionType extends ObjectType
{
  public function __construct(string $name, string $type)
  {
    parent::__construct([
      'name' => $name,
      'fields' => [
        'pageInfo' => TypeRegistry::type(PageInfoType::class),
        'edges' => Type::listOf(new EdgeType($name . 'Edges', $type)),
      ]
    ]);
  }

  /**
   * Get base collection argument array
   */
  public static function getCollectionArguments(): array
  {
    return [
      'first' => Type::int(),
      'after' => Type::string(),
      'search' => Type::string(),
      'filters' => Type::listOf(TypeRegistry::type(FilterType::class)),
      'orders' => Type::listOf(TypeRegistry::type(OrderType::class)),
    ];
  }

  /**
   * Convert array of data to edges object
   */
  public static function arrayToEdges(array $rows, callable $getId)
  {
    $edges = [];
    foreach ($rows as $index => $row) {
      $edges[$index] = ['cursor' => base64_encode($getId($row)), 'node' => $row];
    }
    return $edges;
  }

  /**
   * Convert some of arguments to database keyword
   */
  public static function normalizeArguments(array &$args): void
  {
    $args['offset'] = isset($args['after']) ? base64_decode($args['after']) : 0;
    $args['next'] = $args['first'] ?? null;
  }

  /**
   * Create page info
   */
  public static function createPageInfo(array $edges, int $count, array $args): array
  {
    $hasNextPage = false;

    # Check next page availability
    if (isset($args['offset']) && isset($args['next'])) {
      $hasNextPage = $args['offset'] + $args['next'] < $count;
    }

    # Create page cursor object
    $end = end($edges);
    $pageCursor = [];
    $pageCursor['pages'] = [];
    $currentPageIndex = 0;

    # Only do when client request with pagination
    if (isset($args['next'])) {
      $allPage = ceil($count / $args['next']);
      $index = 0;

      while ($index < $allPage) {
        $cursorOffset = $args['next'] * $index;
        $cursor = base64_encode($cursorOffset);
        $isCurrent = isset($args['offset']) ? $args['offset'] == $cursorOffset : false;

        # Previous page
        if ($isCurrent && $index - 1 > 0) {
          $pageCursor['previous'] = $pageCursor['pages'][$index - 1];
          $currentPageIndex = $index;
        }

        # Page information
        $page = [
          'cursor' => $cursor,
          'pageNumber' => $index,
          'isCurrent' => $isCurrent
        ];

        if ($isCurrent) $pageCursor['current'] = $page;

        array_push(
          $pageCursor['pages'],
          $page
        );

        $index++;
      }

      # Get next page
      if (isset($args['offset']) && isset($pageCursor['pages'][$currentPageIndex + 1]))
        $pageCursor['next'] = $pageCursor['pages'][$currentPageIndex + 1];
    }
    # First & Last
    $pageCursor['first'] = $pageCursor['pages'][0] ?? null;
    $pageCursor['last'] = end($pageCursor['pages']) ?? null;

    # Final page info object
    $pageInfo = [
      'endCursor' => $end ? $end['cursor'] : null,
      'total' => $count,
      'hasNextPage' => $hasNextPage,
      'pageCursor' => $pageCursor
    ];

    return $pageInfo;
  }

  /**
   * Common resolver for collection
   */
  public static function createResolver(callable $getData, callable $getCount, callable $getCursor, array &$args): array
  {
    self::normalizeArguments($args);

    $edges = self::arrayToEdges(
      $getData($args),
      $getCursor
    );

    $pageInfo = self::createPageInfo($edges, $getCount($args), $args);

    return [
      'edges' => $edges,
      'pageInfo' => $pageInfo
    ];
  }
}
