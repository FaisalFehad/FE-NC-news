import React, { Component } from "react";
import makeApiRequests from "../utils/api";
import deleteCommentReq from "../utils/deleteCommentReq";
import Vote from "./Vote";
import Loading from "./Loading";
import ErrDisplay from "./ErrDisplay";
import NoticeMsgDisplay from "./NoticeMsgDisplay";
import { Card } from "react-bootstrap/";

class ArticleComments extends Component {
  state = {
    comments: [],
    sortBy: "created_at",
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
        loading: false
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
            <NoticeMsgDisplay msg={"The comment has been deleted! 💥"} />
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
                <Card className="text-center">
                  <Card.Header>
                    <h5>{comment.username}</h5>
                    <p>
                      <small>{comment.created_at}</small>
                    </p>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <h6>{comment.body}</h6>
                    </Card.Text>
                    <Vote
                      id={comment.comment_id}
                      currentVote={comment.votes}
                      path={"comments"}
                    />
                    <br />
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    {!this.state.deletingComment &&
                      this.props.currentUser === comment.username && (
                        <button
                          className="btn btn-outline-warning"
                          onClick={event =>
                            this.handleDeleteComment(comment.comment_id)
                          }
                        >
                          {`Delete Comment `}
                        </button>
                      )}
                  </Card.Footer>
                </Card>
              </>
            );
          })}
        </>
      );
    } else return <Loading msg={"Cool comments are on their way!"} />;
  }
}

export default ArticleComments;
