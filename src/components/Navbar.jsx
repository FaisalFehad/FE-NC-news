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
      <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="/">
          NC News
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            {this.state.allTopics.map((topic, index) => {
              return (
                <Link
                  className="nav-item nav-link active"
                  to={`topics/${topic.slug}`}
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
