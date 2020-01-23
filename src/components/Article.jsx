import React, { Component } from "react";
import { Link } from "@reach/router";
import makeApiRequests from "../utils/api";
import CommentForm from "./CommentForm";
import Vote from "./Vote";
import Loading from "./Loading";
import ErrDisplay from "./ErrDisplay";

class Article extends Component {
  state = {
    article: "",
    loading: true,
    err: null,
    err_msg: ""
  };

  componentDidMount() {
    const { article_id } = this.props;
    makeApiRequests(`articles/${article_id}`)
      .then(article => {
        this.setState({ article, loading: false });
      })
      .catch(() => {
        this.setState({
          err: true,
          err_msg: "Ops this article dose not exist 💩 404"
        });
      });
  }

  render() {
    const article = this.state.article.article;
    if (article) {
      return (
        <div>
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
          <p>Author {article.author}</p>
          <p>Created at {article.created_at}</p>
          <Link to={"comments"}>
            <button> Show {article.comment_count} comments 👀</button>
          </Link>
          <Vote
            id={article.article_id}
            currentVote={article.votes}
            path={"articles"}
          />
          <CommentForm article_id={article.article_id} />
        </div>
      );
    } else if (this.state.err)
      return <ErrDisplay err_msg={this.state.err_msg} />;
    else return <Loading err_msg={"Just getting you that amazing article"} />;
  }
}

export default Article;
