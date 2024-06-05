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
  protected function send($str)
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
    header('Content-Type: application/json');
    $json = json_encode($data);
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
}
