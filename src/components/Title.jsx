import React from "react";

const Title = ({ username }) => {
  return (
    <div>
      <h1>NC News</h1>
      <h5>Logged In As: {username}</h5>
    </div>
  );
};

export default Title;
