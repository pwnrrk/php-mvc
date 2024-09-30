<?php

namespace App;

use App\Models\Employee;
use App\Models\User;
use Exception;

class Authenticate
{
  const ERROR_UNAUTHORIZED = "Unauthorized";
  const ERROR_FORBIDDEN = "Forbidden";

  public function __construct() {}

  public static function login(array $credentials = [
    'username' => null,
    'password' => null
  ]): bool
  {
    extract($credentials);
    if (!isset($username) || !isset($password)) throw new Exception('Credentials input is required');

    $ds = ldap_connect(
      LDAP_CONFIG['host'],
      LDAP_CONFIG['port']
    );
    ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, LDAP_CONFIG['protocolVersion']);
    ldap_set_option($ds, LDAP_OPT_REFERRALS, ['referals']);

    try {
      ldap_bind($ds, "$username@" . LDAP_CONFIG['domain'], $password);
      $result = ldap_search($ds, LDAP_CONFIG['dn'], "(sAMAccountName=$username)", array('dn', 'cn', 'pager'));
      $entries = ldap_get_entries($ds, $result);
      $unique = $entries[0]["pager"][0];

      $employee = Employee::getById($unique);
      if (!$employee) throw new Exception(self::ERROR_FORBIDDEN);

      $user = User::getById($employee->EmpCode);
      if (!$user) throw new Exception(self::ERROR_FORBIDDEN);

      session_start();
      $_SESSION['currentUser'] = $user->EmpCode;
      return true;
    } catch (Exception $e) {
      error_log($e);
      throw new Exception(self::ERROR_UNAUTHORIZED);
    }
  }

  public static function logout()
  {
    if (session_status() === PHP_SESSION_NONE) session_start();
    session_destroy();
  }

  public static function refresh() {}

  public static function getCurrent(): ?User
  {
    if (session_status() === PHP_SESSION_NONE) session_start();
    if (!isset($_SESSION['currentUser'])) return null;

    $user = User::getById($_SESSION['currentUser']);
    return $user;
  }
}
