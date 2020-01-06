[![Netlify Status](https://api.netlify.com/api/v1/badges/5a134591-3f58-46de-8794-c2304c3ad4b6/deploy-status)](https://app.netlify.com/sites/keen-goldwasser-a7f6c5/deploys)

Repository for my website.
Started from scratch using react: built with webpack and babel.

## Website Deployment
A commit to the master branch of this branch automatically triggers a production build and deploy to website (via `netlify.com`). 

## `dependencies` vs `devDependencies` 
All npm dependencies required for a production build should be made regular `dependencies` in `package.json`. `devDependencies` contain dependencies that are only required when developing the app and running it locally.

Dependencies explained:
- react: UI library
    - `react`: Core library
    - `react-dom`: Renderer for HTML 
- webpack: module bundler
    - `webpack`: core bundler tool
    - `webpack-dev-server`: dev server for local development
    - `webpack-cli`: command-line interface for webpack
    - `babel-loader`: Loads ES2015+ code and transpiles to ES5 using Babel
    - `css-loader`: Loads CSS file with resolved imports and returns CSS code
    - `eslint-loader`: PreLoader for linting code using ESLint
    - `html-webpack-plugin`: Creates HTML file from template and injects bundles
    - `style-loader`: Add exports of a module as style to DOM
- babel: transpiler
    - `@babel/core`: core transpiler library
    - `@babel/cli`: command-line interface for babel
    - `@babel/preset-env`: smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)
    - `@babel/preset-react`: essentially adds JSX transpilation support
- eslint: linter and syntax checker
    - `eslint`: yes, the linter
    - `babel-eslint`: parser to make eslint parse babel-transpiled code
    - `eslint-plugin-import`: linting support for es6 modules (import/export)
    - `eslint-plugin-react`: react-specfic linting rules

## Run
Production build: `npm run build` (builds site into the `build` folder)
Development build: `npm run start` (will launch an in-memory dev server, build results will not show up in file system)