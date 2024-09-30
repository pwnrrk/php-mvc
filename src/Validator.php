<?php

namespace App;

use App\Graphql\ClientException;
use App\Graphql\InputErrorExtension;
use Exception;

/**
 * Abstract class Validator
 * 
 * This class serves as a base for creating custom validators.
 * It initializes attributes dynamically and requires a concrete implementation
 * of the `validate()` method.
 */
abstract class Validator
{
    const notEmpty = "notEmpty";
    const isDate = "isDate";
    const isBool = "isBool";
    const isNumber = "isNumber";
    const min = "min";
    const max = "max";
    const minLength = "minLength";
    const maxLength = "maxLength";
    const unique = "unique";
    const exists = "exists";

    /**
     * Error array
     */
    private array $errors = [];

    /**
     * Constructor for the Validator class.
     * 
     * @param array $attr An associative array of attributes to be set dynamically on the instance.
     */
    public function __construct(array $attr)
    {
        foreach ($attr as $key => $value) {
            if (property_exists($this, $key))
                $this->$key = $value;
        }
    }

    public static function notEmpty($value)
    {
        return !empty($value);
    }

    public static function isDate($value)
    {
        return !empty($value) && date_create($value) != false;
    }

    public static function isBool($value)
    {
        return is_bool($value);
    }

    public static function isNumber($value)
    {
        return is_numeric($value);
    }

    public static function min($value, $checkValue)
    {
        return $value >= $checkValue;
    }

    public static function max($value, $checkValue)
    {
        return $value <= $checkValue;
    }

    public static function minLength($value, $checkValue)
    {
        return !empty($value) && count($value) >= $checkValue;
    }

    public static function maxLength($value, $checkValue)
    {
        return empty($value) || (is_string($value) ? strlen($value) : count($value)) <= $checkValue;
    }

    public static function exists($value, $checkValue)
    {
        return array_search($value, $checkValue) >= 0;
    }


    /**
     * Validate the attributes.
     * 
     * This method must be implemented by subclasses to perform validation logic.
     * 
     * @return bool Returns true if the attributes are valid, otherwise false.
     */
    abstract public function validate(): bool;

    /**
     * Test attributes and collect error if any
     * @param array<string, array<string,{custom: ?callable, errorMessage: ?string, if: ?callable, value: ?mixed }>> $validatorChain
     */
    public function test(array $validatorChain)
    {
        try {
            foreach ($validatorChain as $field => $chain) {
                foreach ($chain as $rule => $options) {
                    // If have should run check
                    if (!isset($options['if']) || $options['if']($this->$field ?? null)) {
                        $pass = false;
                        $method = $options['custom'] ?? null;

                        if (is_callable($method)) {
                            $pass = $method($this->$field ?? null, $options['value'] ?? null);
                        } else if (method_exists(self::class, $rule)) {
                            $pass = self::$rule($this->$field ?? null, $options['value'] ?? null);
                        } else {
                            throw new Exception("$field : Tester function is not callable.");
                        }

                        if (!$pass) {
                            $info = new InputErrorExtension($field, $this->$field, $options['errorMessage'] ?? InputErrorExtension::ERR_INVALID, $rule);
                            array_push($this->errors, $info);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            array_push($this->errors, $e->getMessage());
        }
    }

    /**
     * Get error array
     */
    public function getErrors()
    {
        return $this->errors;
    }

    /**
     * Check if error empty
     */
    public function haveErrors()
    {
        return count($this->errors) > 0;
    }

    /**
     * Throw ClientException, should with handled function
     */
    public function throw()
    {
        throw new ClientException($this->getErrors());
    }

    /**
     * Create instance and run validate method
     * @param class-string<Validator> $validatorClass
     */
    public static function use(string $validatorClass, array $data)
    {
        /**
         * @var Validator
         */
        $validator = new $validatorClass($data);
        return fn() => $validator->validate();
    }
}
