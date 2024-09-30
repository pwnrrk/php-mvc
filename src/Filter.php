<?php

namespace App;

class Filter
{
    public string $field;
    public string $operator;
    public $value;

    public function __construct(array $args)
    {
        $this->field = $args['field'];
        $this->operator = $args['operator'];
        $this->value = $args['value'] ?? null;
    }
}
