<?php

namespace App;

/**
 * Class React
 *
 * A class to render React components within a PHP application.
 *
 * @package App
 */
class React
{
    /**
     * @var array Cache for rendered components
     */
    private static $cache = [];

    /**
     * @var string Environment configuration (development, production)
     */
    private static $env = 'development';

    /**
     * Render a React component with given data.
     *
     * @param string $component The name of the React component to render.
     * @param array $data Data to pass as props to the React component.
     *
     * @throws \Exception If the component does not exist.
     */
    public static function render($component, $data = [])
    {
        try {
            self::validateComponent($component);
            $json = self::prepareData($data);

            // Use cache if available
            if (isset(self::$cache[$component])) {
                echo self::$cache[$component];
            } else {
                ob_start();
                include "Views/main.php";
                echo "<script id='react-value'>";
                echo "window._react_page = '$component';window._react_props = $json;";
                echo "</script>";
                $output = ob_get_clean();
                self::$cache[$component] = $output;
                echo $output;
            }

        } catch (\Exception $e) {
            self::handleError($e);
        }
    }

    /**
     * Validate if the React component exists.
     *
     * @param string $component The name of the component to validate.
     *
     * @throws \Exception If the component file does not exist.
     */
    private static function validateComponent($component)
    {
        $componentPath = __DIR__ . "/Resources/ts/Pages/$component.tsx"; // Adjust path as needed
        if (!file_exists($componentPath)) {
            throw new \Exception("Component '$component' not found.");
        }
    }

    /**
     * Sanitize and encode data to JSON.
     *
     * @param array $data Data to be encoded.
     *
     * @return string The JSON encoded data.
     */
    private static function prepareData($data)
    {
        // Here you could sanitize and validate data
        return json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);
    }

    /**
     * Handle errors by displaying or logging them.
     *
     * @param \Exception $error The caught exception.
     */
    private static function handleError($error)
    {
        if (self::$env === 'development') {
            echo "<div class='error'>Error: {$error->getMessage()}</div>";
        } else {
            // Log the error and show a generic message
            error_log($error->getMessage());
            echo "<div class='error'>An error occurred. Please try again later.</div>";
        }
    }

    /**
     * Set the environment configuration.
     *
     * @param string $environment The environment (development, production).
     */
    public static function setEnvironment($environment)
    {
        self::$env = $environment;
    }
}

