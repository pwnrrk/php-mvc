<?php

namespace App;

/**
 * Class Model
 *
 * Abstract class representing a generic model with basic CRUD operations.
 *
 * @package App
 */
abstract class Model
{
    public int $rowNumber;
    /**
     * Model constructor.
     *
     * Initializes the model's properties using the given associative array.
     *
     * @param array $attr Associative array where keys are property names and values are property values.
     */
    public function __construct(array $attr)
    {
        foreach ($attr as $key => $value) {
            if (property_exists($this, $key))
                $this->$key = $value;
        }
    }

    /**
     * Save the current model instance.
     *
     * This method must be implemented by the subclass to handle saving the model instance.
     *
     * @return mixed The result of the save operation.
     */
    abstract public function save();

    /**
     * Destroy the current model instance.
     *
     * This method must be implemented by the subclass to handle deleting the model instance.
     *
     * @return mixed The result of the destroy operation.
     */
    abstract public function destroy();

    /**
     * Get all instances of the model.
     *
     * This method must be implemented by the subclass to handle retrieving all model instances.
     *
     * @param array Options to be applied to get process.
     * @return array An array of all model instances.
     */
    abstract public static function getAll(array $options = []);

    /**
     * Get a model instance by its ID.
     *
     * This method must be implemented by the subclass to handle retrieving a model instance by its ID.
     *
     * @param mixed $id The ID of the model instance to retrieve.
     * @return mixed The model instance with the specified ID.
     */
    abstract public static function getById($id);

    /**
     * Count all records of the model.
     *
     * This method must be implemented by the subclass to handle count all available object.
     *
     * @param array Options to be applied to get process.
     * @return int Number of available object.
     */
    abstract public static function count(array $options = []);

    /**
     * Builds the base SQL query with the selected table and columns.
     *
     * @param string $table The table name to query.
     * @return Sql The initialized SQL object.
     */
    protected static function buildBaseQuery($table)
    {
        $sql = new Sql(Sql::OPERATION_SELECT);
        $sql->table($table)->columns(['*']);
        return $sql;
    }

    /**
     * Applies sorting to the SQL query based on the provided orders.
     *
     * @param Sql $sql The SQL object to modify.
     * @param array|null $orders Optional sorting rules (field and direction).
     * @param array $defaultOrders Default sorting rules if no orders are provided.
     * @return void
     */
    protected static function applyOrder($sql, $orders, $defaultOrders)
    {
        if (isset($orders)) {
            foreach ($orders as $order) {
                $order = new Order($order);
                $sql->order(["$order->field $order->direction"]);
            }
        } else {
            $sql->order($defaultOrders);
        }
    }

    /**
     * Applies filters to the SQL query.
     *
     * @param Sql $sql The SQL object to modify.
     * @param array|null $filters Array of filter conditions.
     * @param array &$params Parameters array to bind filter values.
     * @return void
     */
    protected static function applyFilters($sql, $filters, &$params)
    {
        if (isset($filters)) {
            foreach ($filters as $filter) {
                $filter = new Filter($filter);
                $parameterName = $sql->getUniqueParamName($filter->field . '_');
                $sql->where("$filter->field $filter->operator :$parameterName");
                $params[$parameterName] = $filter->value;
            }
        }
    }

    /**
     * Adds search conditions to the SQL query.
     *
     * @param Sql $sql The SQL object to modify.
     * @param string|null $search Search keyword to apply.
     * @param array &$params Parameters array to bind search values.
     * @param string $table The table name for search.
     * @return void
     */
    protected static function applySearch($sql, $search, &$params, $table, $columns)
    {
        if ($search) {
            $searchConditions = [];
            foreach ($columns as $index => $col) {
                $parameterName = $sql->getUniqueParamName("search$index");
                array_push($searchConditions, "$table.[$col] LIKE :$parameterName");
                $params[$parameterName] = "%$search%";
            }
            $sql->where('(' . implode(' OR ', $searchConditions) . ')');
        }
    }

    /**
     * Applies pagination logic to the SQL query.
     *
     * @param Sql $sql The SQL object to modify.
     * @param int $offset The offset for the query.
     * @param int|null $next The limit or next number of records to fetch.
     * @return void
     */
    protected static function applyPagination($sql, $offset, $next)
    {
        if ($next) {
            $sql->offset($offset)->next($next);
        }
    }

    /**
     * Executes the SQL query and returns the results as an array of model instances.
     *
     * @param Sql $sql The SQL object representing the query.
     * @param array $params Parameters to bind to the query.
     * @return array The result set as an array of model instances.
     */
    protected static function fetchMany($sql, $params)
    {
        $db = new Database();
        $db->query($sql->__toString());
        foreach ($params as $key => $value) {
            $db->bind($key, $value);
        }
        return $db->resultSet();
    }

    /**
     * Executes the SQL query and returns the as model instances.
     *
     * @param Sql $sql The SQL object representing the query.
     * @param array $params Parameters to bind to the query.
     */
    protected static function fetchOne($sql, $params)
    {
        $db = new Database();
        $db->query($sql->__toString());
        foreach ($params as $key => $value) {
            $db->bind($key, $value);
        }
        return $db->single();
    }

    /**
     * Instantiate and assign row number property.
     * 
     * @param array &$rows List of data to instantiate.
     * @param int $offset Row offset from pagination.
     * @return void
     */
    protected static function assignRowNumber(array &$rows, int $offset, string $model): void
    {
        foreach ($rows as $index => $row) {
            $row = new $model($row);
            $row->rowNumber = $offset + $index;
            $rows[$index] = $row;
        }
    }
}
