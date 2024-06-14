export default function Storage() {
  return (
    <section id="storage">
      <h1>API Reference - Storage Class</h1>
      <p>
        This document provides an overview of the <code>Storage</code> class
        within the <code>App</code> namespace.
      </p>

      <h2>Class: Storage</h2>
      <p>
        A class for handling file and directory operations in the storage
        directory.
      </p>

      <h3>Properties</h3>
      <ul>
        <li>
          <strong>
            <code>const ROOT</code>
          </strong>{" "}
          - The root path of the storage directory.
        </li>
      </ul>

      <h3>path</h3>
      <p>
        <strong>Description:</strong> Get the full path of a file or directory
        in the storage directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $file</code> - The relative path of the file or
          directory.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>string</code> - The full path.
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the file or
        directory does not exist.
      </p>

      <h3>createFile</h3>
      <p>
        <strong>Description:</strong> Create a new file in the storage
        directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $file</code> - The relative path of the file.
        </li>
        <li>
          <code>string $content</code> - The content to write to the file.
          Default is an empty string.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the file could not
        be created.
      </p>

      <h3>readFile</h3>
      <p>
        <strong>Description:</strong> Read the content of a file in the storage
        directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $file</code> - The relative path of the file.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>string</code> - The file content.
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the file does not
        exist or could not be read.
      </p>

      <h3>deleteFile</h3>
      <p>
        <strong>Description:</strong> Delete a file in the storage directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $file</code> - The relative path of the file.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the file does not
        exist or could not be deleted.
      </p>

      <h3>createDirectory</h3>
      <p>
        <strong>Description:</strong> Create a new directory in the storage
        directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $directory</code> - The relative path of the directory.
        </li>
        <li>
          <code>int $permissions</code> - The permissions for the directory.
          Default is <code>0755</code>.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the directory
        could not be created.
      </p>

      <h3>deleteDirectory</h3>
      <p>
        <strong>Description:</strong> Delete a directory in the storage
        directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $directory</code> - The relative path of the directory.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the directory does
        not exist or could not be deleted.
      </p>

      <h3>copy</h3>
      <p>
        <strong>Description:</strong> Copy a file or directory to a new location
        within the storage directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $source</code> - The relative path of the source file or
          directory.
        </li>
        <li>
          <code>string $destination</code> - The relative path of the
          destination.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the source does
        not exist or the copy operation fails.
      </p>

      <h3>move</h3>
      <p>
        <strong>Description:</strong> Move a file or directory to a new location
        within the storage directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $source</code> - The relative path of the source file or
          directory.
        </li>
        <li>
          <code>string $destination</code> - The relative path of the
          destination.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the source does
        not exist or the move operation fails.
      </p>

      <h3>copyDirectory</h3>
      <p>
        <strong>Description:</strong> Recursively copy a directory.
      </p>
      <p>
        <strong>Parameters:</strong>
      </p>
      <ul>
        <li>
          <code>string $source</code> - The source directory.
        </li>
        <li>
          <code>string $destination</code> - The destination directory.
        </li>
      </ul>
      <p>
        <strong>Returns:</strong> <code>void</code>
      </p>
      <p>
        <strong>Throws:</strong> <code>\Exception</code> - If the copy operation
        fails.
      </p>
    </section>
  );
}
