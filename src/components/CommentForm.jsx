import React, { Component } from "react";
import postComment from "../utils/postCommentReq";
import NoticeMsgDisplay from "./NoticeMsgDisplay";

class CommentForm extends Component {
  state = {
    bodyInput: "",
    postedComment: null,
    posting: null
  };

  handleChange = event => {
    this.setState({ bodyInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ posting: true, bodyInput: "" });
    const { bodyInput } = this.state;
    const { article_id } = this.props;
    postComment(article_id, bodyInput).then(postedComment => {
      this.setState({ postedComment, posting: null });
    });
  };

  render() {
    return (
      <ul>
        {this.state.postedComment && (
          <NoticeMsgDisplay
            msg={`"${this.state.postedComment.comment.body}" has been posted!`}
          />
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea
              placeholder="Write a comment 🔥"
              type="text"
              onChange={this.handleChange}
              value={this.state.bodyInput}
              id="comment"
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          {!this.state.posting && (
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
