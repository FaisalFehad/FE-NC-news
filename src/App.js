import React, { Component } from "react";
import { Router } from "@reach/router";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import "./App.css";
import ArticleList from "./components/ArticleList";
import Article from "./components/Article";
import ErrDisplay from "./components/ErrDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPick from "./components/UserPick";

class App extends Component {
  state = {
    username: "jessjelly"
  };

  componentDidMount() {
    const localUser = localStorage.getItem("user");
    if (localUser) this.setState({ username: localUser });
  }

  setUsername = selectedUser => {
    this.setState({ username: selectedUser });
  };

  render() {
    return (
      <div className="App">
        <Title username={this.state.username} />
        <Navbar />
        <Router primary={false}>
          <ArticleList path="/" />
          <UserPick path="/users/" pickedUser={this.setUsername} />
          <ArticleList path="/articles/" />
          <ArticleList exact path="/topics/:topic/" />
          <Article path="/articles/:article_id/" />
          <ErrDisplay default />
        </Router>
      </div>
    );
  }
}

export default App;
