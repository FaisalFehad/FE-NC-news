import React from "react";
import { Link } from "@reach/router";

const Title = ({ username }) => {
  return (
    <div>
      <Link to={"/"}>
        <h1>NC News</h1>
      </Link>
      <h5>
        Logged In As: <Link to={"/users"}>{username}</Link>{" "}
      </h5>
    </div>
  );
};

export default Title;
