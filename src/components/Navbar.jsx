import React, { Component } from "react";
import makeApiRequests from "../utils/api";
import { Link } from "@reach/router";

class Navbar extends Component {
  state = {
    allTopics: []
  };

  componentDidMount() {
    makeApiRequests("topics/").then(({ topics }) => {
      const allTopics = topics.map(topic => topic);
      this.setState({ allTopics });
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          NC News
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to={"/users"}>
              LOGIN
            </Link>
            {this.state.allTopics.map((topic, index) => {
              return (
                <Link
                  className="nav-item nav-link active"
                  to={`/topics/${topic.slug}`}
                  key={index}
                >
                  {topic.slug.toUpperCase()}
                </Link>
              );
            })}
            )
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
