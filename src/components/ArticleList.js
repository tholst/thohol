import React from "react";
import { Switch, Route, Link } from "react-router-dom";
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
                        {React.createElement(articleCache[article.id].default)}
                    </article>
                </Route>
            ))}
        </Switch>
    </div>
);

export default ArticlesList;
