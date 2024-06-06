# PHP + React (Typescript)

This project is combined PHP and React.js. Using PHP as a backend with MVC pattern and pre-built React pages.

## Getting start

After clone this project run following commands.

```
composer install
npm install
```

## How to start development server

We use built-in PHP Web Server and Webpack.

**Starting PHP**

```
php -S 0.0.0.0:8000 -t public
```

**Start Webpack watch**

```
npm run watch
```

## Deploy

Before deploy make sure to build webpack with production mode.

```
npm run build
```

Place entire project in document root of your server and config to serve from public folder only.  
