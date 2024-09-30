<?php

namespace App;

use Exception;
use PDO;
use PDOException;

/**
 * Database class to handle PDO operations
 */
class Database
{
  /**
   * @var string Database username
   */
  private $username;

  /**
   * @var string Database password
   */
  private $password;

  /**
   * @var PDO Instance of PDO
   */
  private $pdo;

  /**
   * @var string Error message
   */
  private $error;

  /**
   * @var PDOStatement Prepared statement
   */
  private $stmt;

  /**
   * Constructor to initialize database connection
   */
  public function __construct()
  {
    $this->username = DB_USER;
    $this->password = DB_PASS;

    // Set DSN
    $dsn = DSN;
    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
      'CharacterSet' => 'utf8mb4'
    ];

    // Create a new PDO instance
    try {
      $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
    } catch (PDOException $e) {
      $this->error = $e->getMessage();
      throw new Exception($this->error);
    }
  }

  /**
   * Prepare statement with query
   *
   * @param string $sql SQL query
   */
  public function query($sql)
  {
    $this->stmt = $this->pdo->prepare($sql);
    return $this;
  }

  /**
   * Bind values to the prepared statement
   *
   * @param string $param Parameter to bind
   * @param mixed $value Value to bind
   * @param int|null $type PDO param type
   */
  public function bind($param, $value, $type = null)
  {
    if (is_null($type)) {
      switch (true) {
        case is_int($value):
          $type = PDO::PARAM_INT;
          break;
        case is_bool($value):
          $type = PDO::PARAM_BOOL;
          break;
        case is_null($value):
          $type = PDO::PARAM_NULL;
          break;
        default:
          $type = PDO::PARAM_STR;
      }
    }
    $this->stmt->bindValue($param, $value, $type);
    return $this;
  }

  /**
   * Execute the prepared statement
   *
   * @return bool True on success, false on failure
   */
  public function execute()
  {
    try {
      return $this->stmt->execute();
    } catch (PDOException $e) {
      throw new Exception($e->getMessage());
    }
  }

  /**
   * Get result set as array of objects
   *
   * @return array Result set
   */
  public function resultSet()
  {
    $this->execute();
    return $this->stmt->fetchAll();
  }

  /**
   * Get a single record as an object
   *
   * @return mixed Single record
   */
  public function single()
  {
    $this->execute();
    return $this->stmt->fetch();
  }

  /**
   * Get record row count
   *
   * @return int Row count
   */
  public function rowCount()
  {
    return $this->stmt->rowCount();
  }

  /**
   * Get the last inserted ID
   *
   * @param string|null $name Name of sequence object that should return
   * @return string Last inserted ID
   */
  public function lastInsertId(?string $name = null)
  {
    return $this->pdo->lastInsertId($name);
  }

  /**
   * Begin a transaction
   *
   * @return bool True on success, false on failure
   */
  public function beginTransaction()
  {
    return $this->pdo->beginTransaction();
  }

  /**
   * End a transaction
   *
   * @return bool True on success, false on failure
   */
  public function endTransaction()
  {
    try {
      return $this->pdo->commit();
    } catch (PDOException $e) {
      throw new Exception($e->getMessage());
    }
  }

  /**
   * Cancel a transaction
   *
   * @return bool True on success, false on failure
   */
  public function cancelTransaction()
  {
    return $this->pdo->rollBack();
  }
}
