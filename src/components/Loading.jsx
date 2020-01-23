import React from "react";

const Loading = ({ msg }) => {
  return (
    <div class="alert alert-info">
      <strong>Loading!</strong> {msg && <h4>{msg}</h4>}
    </div>
  );
};

export default Loading;
