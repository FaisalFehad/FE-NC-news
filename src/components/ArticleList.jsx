import React, { Component } from "react";
import ArticleCard from "./ArticleCard";
import makeApiRequests from "../utils/api";
import Loading from "./Loading";

class ArticleList extends Component {
  state = {
    allArticles: [],
    loading: true
  };

  componentDidMount() {
    if (this.props.topic) {
      makeApiRequests(`articles/?topic=${this.props.topic}`)
        .then(({ articles }) => {
          const articlesData = articles.map(article => article);
          this.setState({ allArticles: articlesData });
        })
        .then(() => {
          this.setState({ loading: false });
        });
    } else {
      makeApiRequests("articles/")
        .then(({ articles }) => {
          const articlesData = articles.map(article => article);
          this.setState({ allArticles: articlesData });
        })
        .then(() => {
          this.setState({ loading: false });
        });
    }
  }

  render() {
    return (
      <article>
        {this.state.loading && (
          <Loading msg={"One tick just getting you the articles"} />
        )}
        <ArticleCard allArticles={this.state.allArticles} />
      </article>
    );
  }
}

export default ArticleList;
