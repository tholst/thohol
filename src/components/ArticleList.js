import React from "react";
import PropTypes from "prop-types";

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

// syntax highlighting
// import 'prismjs';
import "prismjs/themes/prism-tomorrow.css";

// dynamically import markdown docs from content/blog/*/
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

// dynamically import images from content/blog/*/
require.context(
    "../../content/blog/",
    true,
    /\/.*\/[^/]*\.(png|jpg|jpeg|gif)$/
);

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

const Toc = ({ items }) => {
    console.log(items);
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {
                        <a href={`#${item.id}`} key={item.id}>
                            {item.title}
                        </a>
                    }
                    {item.children && item.children.length > 0 && (
                        <Toc items={item.children} />
                    )}
                </li>
            ))}
        </ul>
    );
};

Toc.propTypes = {
    items: PropTypes.PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            level: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            children: PropTypes.array.isRequired
        })
    )
};

const Article = () => {
    let { articleId } = useParams();
    return (
        <article>
            <Toc items={articleCache[articleId].tableOfContents()} />
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
