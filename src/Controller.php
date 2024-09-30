<?php

namespace App;

/**
 * Base controller class for handling common HTTP responses.
 */
class Controller
{
  /**
   * Renders a view with optional data.
   *
   * This method includes the specified view file and extracts the data array
   * to make its elements available as variables within the view.
   *
   * @param string $view The name of the view file to render.
   * @param array $data Optional. An associative array of data to pass to the view. Default is an empty array.
   * @return void
   */
  protected function render($view, $data = [])
  {
    extract($data);
    include "Views/$view.php";
  }

  /**
   * Sets the HTTP response status code.
   *
   * This method sets the HTTP response status code to the specified value.
   *
   * @param int $status The HTTP status code to set.
   * @return $this This instance, to allow method chaining.
   */
  protected function status($status)
  {
    http_response_code($status);
    return $this;
  }

  /**
   * Sends a string as the HTTP response body.
   *
   * @param string $str The string to send.
   * @return void
   */
  protected function send($str = null)
  {
    echo $str;
  }

  /**
   * Sends JSON data as the HTTP response body.
   *
   * This method sets the 'Content-Type' header to 'application/json' and sends
   * the JSON-encoded data as the response body.
   *
   * @param array $data Optional. The data to encode as JSON. Default is an empty array.
   * @return void
   */
  protected function json($data = [])
  {
    $json = json_encode($data);
    if (json_last_error() !== JSON_ERROR_NONE) {
      // JSON encoding failed
      throw new \Exception(json_last_error_msg());
    }
    header('Content-Type: application/json');
    echo $json;
  }

  /**
   * Sends a file as the HTTP response body.
   *
   * This method sends the contents of the specified file as the response body,
   * setting appropriate headers such as 'Content-Type', 'Content-Length', and 'Content-Disposition'.
   *
   * @param string $path The path to the file to send.
   * @throws \Exception If the file does not exist.
   * @return void
   */
  protected function sendFile($path)
  {
    if (file_exists($path)) {
      $file_size = filesize($path);
      $content_type = mime_content_type($path);
      header("Content-Type: $content_type");
      header("Content-Length: $file_size");
      header('Content-Disposition: attachment; filename="' . basename($path) . '"');
      readfile($path);
      exit;
    } else {
      throw new \Exception("No such file or directory");
    }
  }

  /**
   * Retrieves JSON data from the request body.
   *
   * @return mixed|array|false Returns the decoded JSON data if successful, or false if decoding fails.
   */
  protected function body()
  {
    // Get the JSON data from the request body
    $json = file_get_contents('php://input');

    // Decode the JSON data
    $data = json_decode($json, true);

    // Check if decoding was successful
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
      // JSON decoding failed
      return false;
    }

    return $data;
  }

  /**
   * Retrieves an uploaded file from the request.
   *
   * This method retrieves the uploaded file specified by the field name in the form,
   * validates the upload, and returns an array with file information.
   *
   * @param string $field The name of the file input field.
   * @return array|null Returns an array with file information or null if no file was uploaded.
   * @throws \Exception If the file upload encounters an error.
   */
  protected function file($field)
  {
    if (!isset($_FILES[$field])) {
      return null; // No file uploaded with this field name.
    }

    $file = $_FILES[$field];

    // Check for errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
      throw new \Exception('File upload error: ' . $this->codeToMessage($file['error']));
    }

    // You can add more validation checks here (e.g., file size, type, etc.)

    // Return file info
    return [
      'name' => $file['name'],
      'type' => $file['type'],
      'tmp_name' => $file['tmp_name'],
      'error' => $file['error'],
      'size' => $file['size'],
    ];
  }

  /**
   * Converts a file upload error code to a human-readable message.
   *
   * @param int $code The file upload error code.
   * @return string The error message.
   */
  private function codeToMessage($code)
  {
    switch ($code) {
      case UPLOAD_ERR_INI_SIZE:
        return "The uploaded file exceeds the upload_max_filesize directive in php.ini";
      case UPLOAD_ERR_FORM_SIZE:
        return "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
      case UPLOAD_ERR_PARTIAL:
        return "The uploaded file was only partially uploaded";
      case UPLOAD_ERR_NO_FILE:
        return "No file was uploaded";
      case UPLOAD_ERR_NO_TMP_DIR:
        return "Missing a temporary folder";
      case UPLOAD_ERR_CANT_WRITE:
        return "Failed to write file to disk";
      case UPLOAD_ERR_EXTENSION:
        return "A PHP extension stopped the file upload";
      default:
        return "Unknown upload error";
    }
  }
}
