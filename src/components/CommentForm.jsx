import React, { Component } from "react";
import postComment from "../utils/postCommentReq";
import NoticeMsgDisplay from "./NoticeMsgDisplay";
import ErrHandling from "./ErrDisplay";

class CommentForm extends Component {
  state = {
    bodyInput: "",
    postedComment: null,
    posting: null,
    err: null
  };

  handleChange = event => {
    this.setState({ bodyInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ posting: true, bodyInput: "" });
    const { bodyInput } = this.state;
    const { article_id } = this.props;
    if (bodyInput) {
      postComment(article_id, bodyInput)
        .then(postedComment => {
          this.setState({ postedComment, posting: null, err: null });
        })
        .catch(err => {
          this.setState({
            err,
            posting: null
          });
        });
    } else
      this.setState({
        err: "Empty comments are not allowed 🙅‍♀️",
        posting: null
      });
  };

  render() {
    const { err, postedComment, posting, bodyInput } = this.state;
    return (
      <ul>
        {err && <ErrHandling err_msg={err} />}
        {postedComment && (
          <NoticeMsgDisplay
            msg={`"${postedComment.comment.body}" has been posted!`}
          />
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea
              placeholder="Write a comment 🔥"
              type="text"
              onChange={this.handleChange}
              value={bodyInput}
              id="comment"
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          {!posting && (
            <button className="btn btn-outline-secondary">
              Add Comment ▶︎
            </button>
          )}
        </form>
      </ul>
    );
  }
}

export default CommentForm;
