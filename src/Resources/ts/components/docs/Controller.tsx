export default function Controller() {
  return (
    <section id="controller">
      <h1>Controller Class</h1>
      <p>
        This document provides an overview of the methods available in the{" "}
        <code>Controller</code> class within the <code>App</code> namespace.
      </p>

      <h2>Class: Controller</h2>
      <p>
        The <code>Controller</code> class provides methods for handling common
        HTTP responses in a PHP application.
      </p>

      <div>
        <h3>render</h3>
        <p>
          <strong>Description:</strong> Renders a view with optional data.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>string $view</code> - The name of the view file to render.
          </li>
          <li>
            <code>array $data</code> (optional) - An associative array of data
            to pass to the view. Default is an empty array.
          </li>
        </ul>
        <p>
          <strong>Returns:</strong> <code>void</code>
        </p>
      </div>

      <div>
        <h3>status</h3>
        <p>
          <strong>Description:</strong> Sets the HTTP response status code.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>int $status</code> - The HTTP status code to set.
          </li>
        </ul>
        <p>
          <strong>Returns:</strong> <code>$this</code> - This instance, to allow
          method chaining.
        </p>
      </div>

      <div>
        <h3>send</h3>
        <p>
          <strong>Description:</strong> Sends a string as the HTTP response
          body.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>string $str</code> (optional) - The string to send. Default is{" "}
            <code>null</code>.
          </li>
        </ul>
        <p>
          <strong>Returns:</strong> <code>void</code>
        </p>
      </div>

      <div>
        <h3>json</h3>
        <p>
          <strong>Description:</strong> Sends JSON data as the HTTP response
          body.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>array $data</code> (optional) - The data to encode as JSON.
            Default is an empty array.
          </li>
        </ul>
        <p>
          <strong>Returns:</strong> <code>void</code>
        </p>
      </div>

      <div>
        <h3>sendFile</h3>
        <p>
          <strong>Description:</strong> Sends a file as the HTTP response body.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>string $path</code> - The path to the file to send.
          </li>
        </ul>
        <p>
          <strong>Returns:</strong> <code>void</code>
        </p>
        <p>
          <strong>Throws:</strong> <code>\Exception</code> - If the file does
          not exist.
        </p>
      </div>

      <div>
        <h3>body</h3>
        <p>
          <strong>Description:</strong> Retrieves JSON data from the request
          body.
        </p>
        <p>
          <strong>Returns:</strong> <code>mixed|array|false</code> - Returns the
          decoded JSON data if successful, or false if decoding fails.
        </p>
      </div>
    </section>
  );
}
