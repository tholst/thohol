import React from "react";
import "./App.css";
import ArticlesList from "./ArticleList";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About.md";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
    return (
        <div className="vbox app">
            {/* <h1>There is nothing here yet.</h1> */}
            <Header className="flexitem-fix" />
            <div className="content flexitem">
                <Switch>
                    <Route path="/posts">
                        <ArticlesList />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <Redirect to="/posts" />
                    </Route>
                </Switch>
            </div>
            <Footer className="flexitem-fix" />
        </div>
    );
}

export default App;
