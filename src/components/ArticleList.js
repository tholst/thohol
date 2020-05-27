import React from "react";
import PropTypes from "prop-types";

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
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
articleMetadata.forEach((article) => {
    articleCache[article.id] = articleRequireContext(article.filepath);
    articleCache[article.id].meta = article;
});

// dynamically import images from content/blog/*/
require.context(
    "../../content/blog/",
    true,
    /\/.*\/[^/]*\.(png|jpg|jpeg|gif)$/
);

// date formatter
const dateFormatter = new Intl.DateTimeFormat("en-us", {
    month: "long",
    year: "numeric",
    day: "2-digit",
});

const PostEntry = ({ article, linkTo }) => {
    console.log(article);
    return (
        <Link to={linkTo}>
            <div className="postEntry vbox">
                <div className="peMainTitle">{article.title}</div>
                <div className="peSubTitle">{article.subtitle}</div>
                {!article.updated && (
                    <div className="peDate">
                        {dateFormatter.format(new Date(article.date))}
                    </div>
                )}
                {article.updated && (
                    <div className="peDate">
                        {/* <span className="peUpdateLabel">Updated:</span>{" "} */}
                        {dateFormatter.format(new Date(article.updated))}
                        {" "}<span className="ahUpdateLabel">(Updated)</span>
                    </div>
                )}
            </div>
        </Link>
    );
};

const List = () => {
    let match = useRouteMatch();
    return (
        <ul>
            {articleMetadata.map((article, i) => (
                <li key={i}>
                    <PostEntry
                        article={article}
                        linkTo={`${match.url}/${article.id}`}
                    />
                </li>
            ))}
        </ul>
    );
};

const Toc = ({ items }) => {
    // console.log(items);
    return (
        <ul>
            {items.map((item) => (
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
            children: PropTypes.array.isRequired,
        })
    ),
};

const Article = ({ match }) => {
    const id = match.params.articleId;
    const articleData = articleCache[id];

    return (
        <article id={`article-${id}`}>
            <div className="articleTocWrapper vbox">
                <div className="articleTOC">
                    <div className="articleTocHeading">On this page</div>
                    <Toc items={articleData.tableOfContents()} />
                </div>
            </div>

            <div className="articleHeader vbox">
                <div className="ahMainTitle">{articleData.meta.title}</div>
                <div className="ahSubTitle">{articleData.meta.subtitle}</div>
                {!articleData.meta.updated && (
                    <div className="ahDate">
                        {dateFormatter.format(new Date(articleData.meta.date))}
                    </div>
                )}
                {articleData.meta.updated && (
                    <div className="ahDate">
                        {/* <span className="ahUpdateLabel">Updated:</span>{" "} */}
                        {dateFormatter.format(
                            new Date(articleData.meta.updated)
                        )}
                        {" "}<span className="ahUpdateLabel">(Updated)</span>
                    </div>
                )}
            </div>

            {React.createElement(articleData.default)}
        </article>
    );
};

const ArticlesList = () => {
    let match = useRouteMatch();
    // console.log(match);
    return (
        <div className="article-list">
            <Switch>
                <Route path={`${match.path}/:articleId`} component={Article} />
                <Route path={match.path}>
                    <List />
                </Route>
            </Switch>
        </div>
    );
};

export default ArticlesList;
