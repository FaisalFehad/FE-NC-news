import React from "react";

const NoticeMsgDisplay = ({ msg }) => {
  return (
    <div className="alert alert-success" role="alert">
      <h3>{msg}</h3>
    </div>
  );
};

export default NoticeMsgDisplay;
