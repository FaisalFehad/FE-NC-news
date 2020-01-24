import React from "react";
import { Link } from "@reach/router";

const Title = ({ username }) => {
  return (
    <div>
      <h1>NC News</h1>
      <h5>
        Logged In As: <Link to={"/users"}>{username}</Link>{" "}
      </h5>
    </div>
  );
};

export default Title;
