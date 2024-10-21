<?php

namespace App\Graphql;

class InputErrorExtension
{
  const ERR_DUPLICATE = "errors.duplicate";
  const ERR_CONFLICT = "errors.conflict";
  const ERR_REQUIRED = "errors.required";
  const ERR_INVALID = "errors.invalid";
  const ERR_NOT_EXISTS = "errors.notExists";
  const ERR_TOO_LONG = "errors.tooLong";
  const ERR_TOO_SHORT = "errors.tooShort";
  const ERR_OVER = "errors.over";
  const ERR_LOWER = "errors.lower";

  public string $field;
  public string $error;
  public $value;
  public $rule;

  public function __construct(string $field, $value, string $error, string $rule = null)
  {
    $this->field = $field;
    $this->value = $value;
    $this->error = $error;
    $this->rule = $rule;
  }
}
