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
    commentsDisplayed: false
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
        <div>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
          <p>Author {article.author}</p>
          <p>Created at {article.created_at}</p>
          <Vote
            id={article.article_id}
            currentVote={article.votes}
            path={"articles"}
          />
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
          <br />
          {this.state.commentsDisplayed && (
            <ArticleComments article_id={article.article_id} />
          )}
        </div>
      );
    } else if (this.state.err)
      return <ErrDisplay err_msg={this.state.err_msg} />;
    else return <Loading err_msg={"Just getting you that amazing article"} />;
  }
}

export default Article;
