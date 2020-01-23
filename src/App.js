import React, { Component } from "react";
import { Router } from "@reach/router";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import ArticleComments from "./components/ArticleComments";
import ErrDisplay from "./components/ErrDisplay";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    username: "butter_bridge"
  };

  render() {
    return (
      <div className="App">
        <Title username={this.state.username} />
        <Navbar />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/topics/:topic" />
          <ArticleList path="/articles/" />
          <Article path="/articles/:article_id/" />
          <ArticleComments path="/articles/:article_id/comments" />
          <ErrDisplay default />
        </Router>
      </div>
    );
  }
}

export default App;
