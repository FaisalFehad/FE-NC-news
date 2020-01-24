import React, { Component } from "react";

class UserPick extends Component {
  state = {
    usersList: [
      "cooljmessy",
      "weegembump",
      "happyamy2016",
      "jessjelly",
      "grumpy19",
      "tickle122",
      "happyamy2016"
    ]
  };

  handleClick = selectedUser => {
    this.props.pickedUser(selectedUser);
  };

  render() {
    return this.state.usersList.map((user, index) => {
      return (
        <div className="card" key={index}>
          <div className="card-header"></div>
          <div className="card-body">
            <h6 className="card-title">{user}</h6>
            <a
              onClick={event => this.handleClick(user)}
              className="btn btn-outline-info"
            >
              {`Login as ${user}`}
            </a>
          </div>
        </div>
      );
    });
  }
}

export default UserPick;
