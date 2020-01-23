import React, { Component } from "react";
import updateArticleVoteReq from "../utils/updateVoteReq";
import { Button } from "react-bootstrap";

class Vote extends Component {
  state = { currentVote: 0, voteValue: 0 };

  handleVote = num => {
    this.setState(currentState => {
      return {
        currentVote: currentState.currentVote + num,
        voteValue: currentState.voteValue + num
      };
    });
    const { path, id } = this.props;
    updateArticleVoteReq(id, num, path);
  };

  componentDidMount() {
    const { currentVote } = this.props;
    this.setState({ currentVote });
  }

  render() {
    return (
      <div>
        <h4>Votes: {this.state.currentVote}</h4>
        {this.state.voteValue <= 0 && (
          <button
            onClick={event => this.handleVote(1)}
            type="button"
            class="btn btn-light"
            type="button"
            class="btn btn-outline-info"
          >
            Up Vote 👍
          </button>
        )}
        {this.state.voteValue >= 0 && (
          <button
            onClick={event => this.handleVote(-1)}
            type="button"
            class="btn btn-outline-danger"
          >
            Down Vote 👎
          </button>
        )}
        <br />
      </div>
    );
  }
}

export default Vote;
