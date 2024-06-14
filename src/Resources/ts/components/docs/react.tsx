export default function ReactDoc() {
  return (
    <section id="react">
      <h1>React Class</h1>
      <p>
        This document provides an overview of the <code>React</code> class
        within the <code>App</code> namespace.
      </p>

      <h2>Class: React</h2>
      <p>
        The <code>React</code> class is designed to render React components
        within a PHP application.
      </p>

      <h3>Properties</h3>
      <ul>
        <li>
          <strong>
            <code>private static $cache</code>
          </strong>{" "}
          - An array to cache rendered components.
        </li>
        <li>
          <strong>
            <code>private static $env</code>
          </strong>{" "}
          - A string for environment configuration (development, production).
          Default is <code>'development'</code>.
        </li>
      </ul>

      <h3>render</h3>
      <p>
        <strong>Description:</strong> Render a React component with given data.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $component</code> - The name of the React component to
          render.
        </li>
        <li>
          <code>array $data</code> - Data to pass as props to the React
          component. Default is an empty array.
        </li>
      </ul>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the component does
        not exist.
      </p>

      <h3>validateComponent</h3>
      <p>
        <strong>Description:</strong> Validate if the React component exists.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $component</code> - The name of the component to
          validate.
        </li>
      </ul>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the component file
        does not exist.
      </p>

      <h3>prepareData</h3>
      <p>
        <strong>Description:</strong> Sanitize and encode data to JSON.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>array $data</code> - Data to be encoded.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>string</code> - The JSON encoded data.
      </p>

      <h3>handleError</h3>
      <p>
        <strong>Description:</strong> Handle errors by displaying or logging
        them.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>\Exception $error</code> - The caught exception.
        </li>
      </ul>

      <h3>setEnvironment</h3>
      <p>
        <strong>Description:</strong> Set the environment configuration.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $environment</code> - The environment (development,
          production).
        </li>
      </ul>
    </section>
  );
}
