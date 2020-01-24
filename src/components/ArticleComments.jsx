import React, { Component } from "react";
import makeApiRequests from "../utils/api";
import deleteCommentReq from "../utils/deleteCommentReq";
import Vote from "./Vote";
import Loading from "./Loading";
import ErrDisplay from "./ErrDisplay";
import NoticeMsgDisplay from "./NoticeMsgDisplay";

class ArticleComments extends Component {
  state = {
    comments: [],
    sortBy: "created_at",
    loggedInUser: "",
    loading: true,
    err: false,
    err_msg: "",
    deletingComment: false,
    commentDeleted: false
  };

  componentDidMount() {
    const { article_id } = this.props;
    makeApiRequests(`articles/${article_id}/comments`).then(comments => {
      this.setState({
        comments,
        loading: false,
        loggedInUser: this.props.currentUser
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    if (prevProps.article_id !== article_id) {
      makeApiRequests(
        `articles/${article_id}/comments?sort_by=${this.state.sortBy}`
      ).then(comments => {
        this.setState({ comments });
      });
    }
  }

  handleSortByByChange = ({ target: { value } }) => {
    this.setState({ sortBy: value });
  };

  handleDeleteComment = comment_id => {
    this.setState({ commentDeleted: false, deletingComment: true });
    deleteCommentReq(`comments/${comment_id}`)
      .then(() => {
        this.setState({ commentDeleted: true, deletingComment: false });
      })
      .catch(() => {
        this.setState({
          loading: false,
          err: true,
          err_msg: "The comment you trying to delete is no longer exist 🙅‍♀️"
        });
      });
  };

  render() {
    const {
      comments: { comments }
    } = this.state;

    if (comments) {
      if (this.state.err) return <ErrDisplay err_msg={this.state.err_msg} />;
      return (
        <>
          {this.state.commentDeleted && (
            <NoticeMsgDisplay msg={"The comment has been deleted!"} />
          )}
          <form>
            <label>
              Sort comments by:
              <select
                value={this.state.value}
                onChange={this.handleSortByByChange}
              >
                <option value="created_at">Date Created</option>
                <option value="username">Author</option>
                <option value="votes"> Comment Votes</option>
              </select>
            </label>
          </form>
          {comments.map(comment => {
            return (
              <>
                <hr />
                <br />
                <p>Body: {comment.body}</p>
                <h1>{console.log(this.state.loggedInUser)}</h1>
                <p>Username: {comment.username}</p>
                <p>Created at: {comment.created_at}</p>
                <br />
                <Vote
                  id={comment.comment_id}
                  currentVote={comment.votes}
                  path={"comments"}
                />
                <br />
                {!this.state.deletingComment &&
                  this.state.loggedInUser === comment.username && (
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={event =>
                        this.handleDeleteComment(comment.comment_id)
                      }
                    >
                      Delete Comment <span role="img">💩</span>
                    </button>
                  )}
              </>
            );
          })}
        </>
      );
    } else return <Loading msg={"Cool comments are on their way!"} />;
  }
}

export default ArticleComments;
