import React, { Component } from "react";
import { Link } from "@reach/router";
import makeApiRequests from "../utils/api";
import CommentForm from "./CommentForm";
import Vote from "./Vote";
import Loading from "./Loading";
import ErrDisplay from "./ErrDisplay";
import ArticleComments from "./ArticleComments";

class Article extends Component {
  state = {
    article: "",
    loading: true,
    err: false,
    err_msg: "",
    commentsDisplayed: false,
    commentFormDisplayed: false
  };

  componentDidMount() {
    const { article_id } = this.props;
    makeApiRequests(`articles/${article_id}`)
      .then(({ article }) => {
        this.setState({ article, loading: false });
      })
      .catch(() => {
        this.setState({
          err: true,
          err_msg: "oops this article dose not exist 💩 404"
        });
      });
  }

  handleShowComments = () => {
    const { commentsDisplayed } = this.state;
    this.setState({ commentsDisplayed: !commentsDisplayed });
  };

  render() {
    const { article } = this.state;
    if (article) {
      return (
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs"></ul>
          </div>
          <div class="card-body">
            <h4 class="card-title">{article.title}</h4>
            <p class="card-text">{article.body}</p>
            <Vote
              id={article.article_id}
              currentVote={article.votes}
              path={"articles"}
            />
            <hr />
            <CommentForm article_id={article.article_id} />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={this.handleShowComments}
            >
              {!this.state.commentsDisplayed
                ? `Show ${article.comment_count} comments 👀`
                : `Hide Comments 🙈`}
            </button>
            {this.state.commentsDisplayed && (
              <ArticleComments
                article_id={article.article_id}
                currentUser={this.props.currentUser}
              />
            )}
          </div>
        </div>
      );
    } else if (this.state.err)
      return <ErrDisplay err_msg={this.state.err_msg} />;
    else return <Loading err_msg={"Just getting you that amazing article"} />;
  }
}

export default Article;
