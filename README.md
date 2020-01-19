[![Netlify Status](https://api.netlify.com/api/v1/badges/5a134591-3f58-46de-8794-c2304c3ad4b6/deploy-status)](https://app.netlify.com/sites/keen-goldwasser-a7f6c5/deploys)

Repository for my website.
Started from scratch using react: built with webpack and babel.

## Website Deployment

A commit to the master branch of this branch automatically triggers a production build and deploy to website (via `netlify.com`).

## `dependencies` vs `devDependencies`

All npm dependencies required for a production build should be made regular `dependencies` in `package.json`. `devDependencies` contain dependencies that are only required when developing the app and running it locally.

Dependencies explained:

-   react: UI library
    -   `react`: Core library
    -   `react-dom`: Renderer for HTML
    -   `react-router`: core routing library (used by `react-router-dom`)
    -   `react-router-dom`: client-side routing library
-   webpack: module bundler
    -   `webpack`: core bundler tool
    -   `webpack-dev-server`: dev server for local development
    -   `webpack-cli`: command-line interface for webpack
    -   `babel-loader`: Loads ES2015+ code and transpiles to ES5 using Babel
    -   `css-loader`: Loads CSS file with resolved imports and returns CSS code
    -   `eslint-loader`: PreLoader for linting code using ESLint
    -   `html-webpack-plugin`: Creates HTML file from template and injects bundles
    -   `style-loader`: Add exports of a module as style to DOM
    -   `@mdx-js/loader`: loader for markdown and markdown-with-jsx documents
    -   `val-loader`: executes imported script and replaces it with script output
-   babel: transpiler
    -   `@babel/core`: core transpiler library
    -   `@babel/cli`: command-line interface for babel
    -   `@babel/preset-env`: smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)
    -   `@babel/preset-react`: essentially adds JSX transpilation support
-   eslint: linter and syntax checker
    -   `eslint`: yes, the linter
    -   `babel-eslint`: parser to make eslint parse babel-transpiled code
    -   `eslint-plugin-import`: linting support for es6 modules (import/export)
    -   `eslint-plugin-react`: react-specfic linting rules
-   other
    -   `glob`: search/select files using glob patterns
    -   `gray-matter`: markdown frontmatter parser

## Run

-   Production build: `npm run build` (builds site into the `build` folder)
-   Development build: `npm run start` (will launch an in-memory dev server, build results will not show up in file system)
-   Debug build: `npm run webpack-debug` uses dev-config and produces `compilation-stats.json` that can be uploaded to (http://webpack.github.io/analyse/#home)[http://webpack.github.io/analyse/#home] for analysis

## Blog Article Discovery and Import

Blog articles that fulfill the following criteria are automatically detected, parsed from markdown and shown on the blog.

### Criteria for publishing

-   frontmatter field `published` set to `true`
-   filename of markdown file begins with digits followed by an underscorce: `17_example.md`
-   markdown file is stored in its individual folder below `content/blog`. Example: `content/blog/article_folder_17/17_example.md`

### Implementation

**Goal**: Writing articles is all that is needed, the blog builds itself from the available articles.

1. _List of articles with metadata_: External node script `makePostList.val.js` uses `glob` (for file search) and `gray-matter` for frontmatter parsing. It is imported into a react component via
   `import articleMetadata from "../../makePostList.val.js";`. The `val-loader` is used with webpack to evaluate the script and import its output into the react component file. (An alternative solution would have been a custom webpack loader, that strips out the parsed frontmatter and forwards markdown to the actual markdown loaders, or mdx loaders in this case.)
1. _Import of all articles_: Implemented via `require.context()`. All articles (fulfilling the filepath/filename criteria above) are imported.
    ```jsx
    import articleMetadata from "../../makePostList.val.js";
    const articleRequireContext = require.context(
        "../../content/blog/",
        true,
        /\/.*\/[0-9]+_[^/]*\.md(x)?$/
    );
    const articleCache = {};
    articleMetadata.forEach(article => {
        articleCache[article.id] = articleRequireContext(article.filepath);
    });
    ```
1. **React Component**: The corresponding react component is quite simple. It uses ReactRouter to switch displayed content between the list of articles and the different articles themselves. A route is created for each article. The list of articles is contains a Router Link for each article. Note the line `{React.createElement(articleCache[article.id].default)}`. Here we are not using JSX syntax but regular React calls. Remember that JSX translation is based on element names starting with a capital letter. It would be possible to trick the transpiler, but directly providing the translation outcome seems easier. Also we are accessing the imported and transpiled markdown via `.default` which I figured out through trial and error, and do not understand.

    ```jsx
    import React from "react";
    import { Switch, Route, Link } from "react-router-dom";
    // import article data

    const List = () => (
        <ul>
            {articleMetadata.map((article, i) => (
                <li key={i}>
                    <Link to={article.id}>
                        {article.title} ({article.date})
                    </Link>
                </li>
            ))}
        </ul>
    );

    const ArticlesList = () => (
        <div className="article-list">
            <Switch>
                <Route path="/posts">
                    <List />
                </Route>

                {articleMetadata.map((article, i) => (
                    <Route path={"/" + article.id} key={i}>
                        <article>
                            {React.createElement(
                                articleCache[article.id].default
                            )}
                        </article>
                    </Route>
                ))}
            </Switch>
        </div>
    );

    export default ArticlesList;
    ```
