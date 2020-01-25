import React, { Component } from "react";
import updateArticleVoteReq from "../utils/updateVoteReq";

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
        <h5>Votes: {this.state.currentVote}</h5>
        {this.state.voteValue <= 0 && (
          <button
            onClick={event => this.handleVote(1)}
            type="button"
            className="btn btn-outline-info"
          >
            Up Vote <span role="img">👍</span>
          </button>
        )}
        {this.state.voteValue >= 0 && (
          <button
            onClick={event => this.handleVote(-1)}
            type="button"
            className="btn btn-outline-danger"
          >
            Down Vote <span role="img">👎</span>
          </button>
        )}
        <br />
      </div>
    );
  }
}

export default Vote;
