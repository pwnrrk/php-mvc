export default function Model() {
  return (
    <section id="model">
      <h1>Model Class</h1>
      <p>
        This document provides an overview of the <code>Model</code> class
        within the <code>App</code> namespace.
      </p>

      <h2>Class: Model</h2>
      <p>
        The <code>Model</code> class is an abstract class representing a generic
        model with basic CRUD operations.
      </p>

      <div className="method">
        <h3>Constructor</h3>
        <p>
          <strong>Description:</strong> Initializes the model's properties using
          the given associative array.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>array $attr</code> - Associative array where keys are property
            names and values are property values.
          </li>
        </ul>
      </div>

      <div className="method" style={{ marginBottom: "20px" }}>
        <h3>save</h3>
        <p>
          <strong>Description:</strong> Save the current model instance.
        </p>
        <p>
          This method must be implemented by the subclass to handle saving the
          model instance.
        </p>
        <p>
          <strong>Returns:</strong> <code>mixed</code> - The result of the save
          operation.
        </p>
      </div>

      <div className="method" style={{ marginBottom: "20px" }}>
        <h3>destroy</h3>
        <p>
          <strong>Description:</strong> Destroy the current model instance.
        </p>
        <p>
          This method must be implemented by the subclass to handle deleting the
          model instance.
        </p>
        <p>
          <strong>Returns:</strong> <code>mixed</code> - The result of the
          destroy operation.
        </p>
      </div>

      <div className="method" style={{ marginBottom: "20px" }}>
        <h3>getAll</h3>
        <p>
          <strong>Description:</strong> Get all instances of the model.
        </p>
        <p>
          This method must be implemented by the subclass to handle retrieving
          all model instances.
        </p>
        <p>
          <strong>Returns:</strong> <code>array</code> - An array of all model
          instances.
        </p>
      </div>

      <div className="method" style={{ marginBottom: "20px" }}>
        <h3>getById</h3>
        <p>
          <strong>Description:</strong> Get a model instance by its ID.
        </p>
        <p>
          This method must be implemented by the subclass to handle retrieving a
          model instance by its ID.
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>mixed $id</code> - The ID of the model instance to retrieve.
          </li>
        </ul>
        <p>
          <strong>Returns:</strong> <code>mixed</code> - The model instance with
          the specified ID.
        </p>
      </div>
    </section>
  );
}
