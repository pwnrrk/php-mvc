export default function Installation() {
  return (
    <section id="installation">
      <h1>Installation</h1>
      <h2>Requirements</h2>
      <ul>
        <li>
          <a href="https://www.git-scm.com/">Git</a>
        </li>
        <li>
          <a href="https://www.php.net/">PHP</a>
        </li>
        <li>
          <a href="https://getcomposer.org/">Composer</a>
        </li>
        <li>
          <a href="https://nodejs.org/en">Node.js & NPM</a>
        </li>
      </ul>
      <h2>Setup project</h2>
      <ol>
        <li>
          <p>Clone project to your computer</p>
          <pre>
            <code>
              git clone https://github.com/pwnrrk/php-mvc.git
              /path/to/yourproject/
            </code>
          </pre>
        </li>
        <li>
          <p>Change git origin to your account</p>
          <pre>
            <code>
              git remote set-url origin https://github.com/user/repo2.git
            </code>
          </pre>
        </li>
        <li>
          <p>Install PHP and Node.js packages</p>
          <pre>
            <code>
              # Install PHP packages <br />
              composer install <br />
              <br />
              # Install Node.js packages <br />
              npm install
            </code>
          </pre>
        </li>
      </ol>
      <h2 id="running-development-server">Running development server</h2>
      <ol>
        <li>
          <p>PHP development server</p>
          <pre>
            <code>php -S 0.0.0.0:8000 -t public</code>
          </pre>
        </li>
        <li>
          <p>Webpack watch</p>
          <pre>
            <code>npm run watch</code>
          </pre>
          See more script in package.json
        </li>
        <li>
          <p>
            Go to <a href="http://localhost:8000">http://localhost:8000</a>
          </p>
        </li>
      </ol>
    </section>
  );
}
