import React from "react";
import "./App.css";
import ArticlesList from "./ArticleList";
import Header from "./Header";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
    return (
        <div className="vbox">
            {/* <h1>There is nothing here yet.</h1> */}
            <Header className="flexitem" />
            <div className="content">
                <Switch>
                    <Route path="/posts">
                        <ArticlesList />
                    </Route>
                    <Route path="/">
                        <Redirect to="/posts" />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
