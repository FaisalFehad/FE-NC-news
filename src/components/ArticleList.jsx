import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import makeApiRequests from "../utils/api";
import ErrHandling from "./ErrDisplay";
import Loading from "./Loading";

class ArticleList extends Component {
  state = {
    allArticles: [],
    loading: true,
    err_msg: null
  };

  componentDidMount() {
    const { topic } = this.props;

    makeApiRequests(`articles/?topic=${topic || ""}`)
      .then(({ articles }) => {
        console.log(articles, "<<<<< articles");

        if (articles.length)
          this.setState({ allArticles: articles, loading: false });
        else
          this.setState({
            err_msg: "No Articles found with this topic 🙅‍♀️",
            loading: false
          });
      })
      .catch(
        ({
          response: {
            data: { msg }
          }
        }) => {
          this.setState({ err_msg: msg, loading: false });
        }
      );
  }

  render() {
    const { err_msg, loading, allArticles, currentUser } = this.state;
    return (
      <article>
        {!allArticles || (err_msg && <ErrHandling err_msg={err_msg} />)}
        {loading && (
          <Loading msg={"One tick just getting you the articles 🏃‍♂️💨"} />
        )}
        <ArticleCard allArticles={allArticles} currentUser={currentUser} />
      </article>
    );
  }
}

export default ArticleList;
