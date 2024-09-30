<?php

namespace App;

use Exception;

/**
 * Class Sql
 * A class for building SQL queries.
 */
class Sql
{
  // Constants for SQL operations
  const OPERATION_SELECT = "SELECT";
  const OPERATION_UPDATE = "UPDATE";
  const OPERATION_INSERT = "INSERT";
  const OPERATION_DELETE = "DELETE";

  // Private properties for storing query components
  private string $_operation;
  private array $_columns = [];
  private string $_table = "";
  private array $_where = [];
  private array $_join = [];
  private array $_order = [];
  private string $_offset = "";
  private string $_next = "";
  private string $_distinct = "";
  private string $_statement = "";
  private string $_top = "";
  private array $_values = [];

  /**
   * Sql constructor.
   * @param string $operation The SQL operation (SELECT, INSERT, UPDATE, DELETE).
   */
  public function __construct(string $operation)
  {
    $this->_operation = strtoupper($operation);
  }

  /**
   * Sets the columns for the query.
   * @param string[] $columns The columns to be selected or used in the query.
   * @return self
   */
  public function columns(array $columns): self
  {
    $this->_columns = array_merge($this->_columns, $columns);
    return $this;
  }

  /**
   * Sets the table name for the query.
   * @param string $tableName The name of the table.
   * @return self
   */
  public function table(string $tableName): self
  {
    $this->_table = $tableName;
    return $this;
  }

  /**
   * Adds conditions to the WHERE clause.
   * @param string $conditions The conditions for the WHERE clause.
   * @return self
   */
  public function where(string $conditions): self
  {
    array_push($this->_where, $conditions);
    return $this;
  }

  /**
   * Adds a JOIN clause to the query.
   * @param string $joinStatement The join statement.
   * @param string|null $type The type of join (e.g., LEFT, RIGHT).
   * @return self
   */
  public function join(string $joinStatement, ?string $type): self
  {
    if ($type) $type = "LEFT";
    $type = strtoupper($type);
    array_push($this->_join, "$type JOIN $joinStatement");
    return $this;
  }

  /**
   * Sets the order by clause.
   * @param string[] $orderStatements The columns to order by.
   * @return self
   */
  public function order(array $orderStatements): self
  {
    $this->_order = array_merge($this->_order, $orderStatements);
    return $this;
  }

  /**
   * Sets the offset for the query.
   * @param int $rows The number of rows to skip.
   * @return self
   * @throws Exception If offset is used more than once.
   */
  public function offset(int $rows): self
  {
    if ($this->_offset) throw new Exception("Offset can be used once", 1);

    $this->_offset = "OFFSET $rows ROWS";
    return $this;
  }

  /**
   * Sets the fetch next rows clause.
   * @param int $rows The number of rows to fetch.
   * @return self
   * @throws Exception If next is used more than once.
   */
  public function next(int $rows): self
  {
    if ($this->_next) throw new Exception("Next can be used once", 1);

    $this->_next = "FETCH NEXT $rows ROWS ONLY";
    return $this;
  }

  /**
   * Sets the query to select distinct values.
   * @return self
   */
  public function distinct(): self
  {
    $this->_distinct = "DISTINCT";
    return $this;
  }

  /**
   * Sets the top clause for the query.
   * @param int $rows The number of rows to select.
   * @return self
   */
  public function top(int $rows): self
  {
    $this->_top = "TOP ($rows)";
    return $this;
  }

  /**
   * Sets the values for an INSERT query.
   * @param array $values The values to insert.
   * @return self
   * @throws Exception If the operation is not INSERT.
   */
  public function values(array $values): self
  {
    if ($this->_operation !== self::OPERATION_INSERT) throw new Exception("Invalid use of values() method.", 1);

    $values = implode(', ', $values);
    array_push($this->_values, "($values)");
    return $this;
  }

  /**
   * Sets the values for an UPDATE query.
   * @param string $name The column name.
   * @param mixed $value The value to set.
   * @return self
   * @throws Exception If the operation is not UPDATE.
   */
  public function set(string $name, $value): self
  {
    if ($this->_operation !== self::OPERATION_UPDATE) throw new Exception("Invalid use of set() method.", 1);

    array_push($this->_values, "$name = $value");
    return $this;
  }

  /**
   * Generates a unique parameter name.
   * @param string $prefix The prefix for the parameter name.
   * @return string
   */
  public function getUniqueParamName(string $prefix): string
  {
    $name = $prefix . uniqid();
    $name = str_replace('[', '', $name);
    $name = str_replace(']', '', $name);
    $name = str_replace('.', '_', $name);
    return $name;
  }

  /**
   * Builds and returns the SQL statement as a string.
   * @return string
   * @throws Exception If required components are missing.
   */
  public function __toString(): string
  {
    $operation = strtoupper($this->_operation);
    $table = $this->_table;
    if (!$table) throw new Exception('Table is required');
    switch ($operation) {
      case 'SELECT':
        $table = "FROM $table";
        $columns = implode(',', $this->_columns);
        if (!$columns) throw new Exception('Columns are required in select statement');
        $join = implode(" ", $this->_join);
        $where = implode(' AND ', $this->_where);
        if ($where) $where = "WHERE $where";
        $order = implode(",", $this->_order);
        if ($order) $order = "ORDER BY $order";
        $distinct = $this->_distinct;
        $offset = $this->_offset;
        $next = $this->_next;
        $top = $this->_top;

        $this->_statement =
          implode(
            ' ',
            array_filter(
              [$operation, $distinct, $top, $columns, $table, $join, $where, $order, $offset, $next],
              function ($var) {
                return $var !== "";
              }
            )
          );
        break;
      case 'INSERT':
        $table = "INTO $table";
        $columns = implode(',', $this->_columns);
        $columns = "($columns)";
        $values = implode(', ', $this->_values);
        if (strstr($columns, "*")) throw new Exception('Expect column names. Found *');
        $values = "VALUES $values";
        $this->_statement = "$operation $table $columns $values";
        break;
      case 'UPDATE':
        $values = implode(', ', $this->_values);
        $values = "SET $values";
        $where = implode(' AND ', $this->_where);
        if ($where) $where = "WHERE $where";
        $this->_statement = implode(' ', array_filter(
          [$operation, $table, $values, $where],
          fn($var) => $var !== ""
        ));
        break;
      case 'DELETE':
        $table = "FROM $table";
        $where = implode(' AND ', $this->_where);
        if ($where) $where = "WHERE $where";
        $this->_statement = implode(' ', array_filter(
          [$operation, $table, $where],
          fn($var) => $var !== ""
        ));
        break;
      default:
        throw new Exception("The operation given is not supported", 1);
        break;
    }

    return $this->_statement;
  }
}
