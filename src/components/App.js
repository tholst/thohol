import React from "react";
import "./App.css";
import ArticlesList from "./ArticleList";
import Header from "./Header";

function App() {
    return (
        <div className="vbox">
            {/* <h1>There is nothing here yet.</h1> */}
            <Header className="flexitem" />
            <div className="content">
                <ArticlesList />
            </div>
        </div>
    );
}

export default App;
