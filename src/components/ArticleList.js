import React from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
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

const List = () => {
    let match = useRouteMatch();
    return (
        <ul>
            {articleMetadata.map((article, i) => (
                <li key={i}>
                    <Link to={`${match.url}/${article.id}`}>
                        {article.title} ({article.date})
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const Article = () => {
    let { articleId } = useParams();
    return (
        <article>
            {React.createElement(articleCache[articleId].default)}
        </article>
    );
};

const ArticlesList = () => {
    let match = useRouteMatch();
    console.log(match);
    return (
        <div className="article-list">
            <Switch>
                <Route path={`${match.path}/:articleId`}>
                    <Article />
                </Route>
                <Route path={match.path}>
                    <List />
                </Route>
            </Switch>
        </div>
    );
};

export default ArticlesList;
